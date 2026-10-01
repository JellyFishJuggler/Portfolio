import { useCallback, useRef, useState } from "react";
import { contact } from "../data/contact";
import { site } from "../data/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = contact.errors.name;
  if (!values.email.trim()) errors.email = contact.errors.email;
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = contact.errors.invalidEmail;
  if (!values.message.trim()) errors.message = contact.errors.message;
  return errors;
}

/**
 * Owns the three field values, their validation and the submission path.
 *
 * Validation runs on submit; after the first attempt every change
 * revalidates so errors clear as they are fixed. If no endpoint is
 * configured it falls back to a mailto link that fills the user's email
 * client with the message.
 *
 * @returns {{
 *   values: { name: string, email: string, message: string },
 *   errors: Record<string, string>,
 *   status: "idle"|"sending"|"success"|"error"|"info",
 *   feedback: string|null,
 *   setValue: (name: string, value: string) => void,
 *   handleSubmit: (e?: Event) => Record<string, string>|null,
 * }}
 */
export function useContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState(null);
  const attemptedRef = useRef(false);

  const setValue = useCallback((name, value) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      if (attemptedRef.current) setErrors(validate(next));
      return next;
    });
  }, []);

  const openMailto = useCallback((payload) => {
    const subject = encodeURIComponent(payload._subject);
    const body = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
    );
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      attemptedRef.current = true;
      const next = validate(values);
      setErrors(next);

      if (Object.keys(next).length > 0) {
        setStatus("idle");
        setFeedback(null);
        return next;
      }

      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        _subject: contact.subject(values.name.trim()),
      };

      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
      if (!endpoint) {
        setStatus("info");
        setFeedback(contact.status.opening);
        openMailto(payload);
        return null;
      }

      setStatus("sending");
      setFeedback(null);
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) throw new Error(String(res.status));
          setStatus("success");
          setFeedback(contact.status.success);
          setValues({ name: "", email: "", message: "" });
        })
        .catch(() => {
          setStatus("error");
          setFeedback(contact.status.error);
        });
      return null;
    },
    [values, openMailto],
  );

  return { values, errors, status, feedback, setValue, handleSubmit };
}

export default useContactForm;