import { useRef } from "react";
import { contact } from "../../data/contact";
import useContactForm from "../../hooks/useContactForm";
import { Button, FormField, TextArea, TextInput } from "../ui/form";
import { FormStatus } from "./FormStatus";
import styles from "./ContactForm.module.css";

/**
 * The contact card's form. Presentational: validation, submission and the
 * endpoint/mailto fallback all live in useContactForm.
 */
export function ContactForm() {
  const { values, errors, status, feedback, setValue, handleSubmit } =
    useContactForm();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const hpRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    if (hpRef.current && hpRef.current.value) return;
    const next = handleSubmit(e);
    const first = next?.name
      ? nameRef
      : next?.email
        ? emailRef
        : next?.message
          ? messageRef
          : null;
    first?.current?.focus();
  };

  const field = (id, name, type, inputRef) => ({
    id,
    name,
    type,
    inputRef,
    value: values[name],
    error: errors[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-error` : undefined,
    onChange: (e) => setValue(name, e.target.value),
    required: true,
  });

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.hp}>
        <label htmlFor="contact-website" aria-hidden="true">
          Website
        </label>
        <input
          id="contact-website"
          name="website"
          ref={hpRef}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      <FormField
        id="contact-name"
        label={contact.labels.name}
        required
        error={errors.name}
        errorId="contact-name-error"
      >
        <TextInput
          {...field("contact-name", "name", "text", nameRef)}
          placeholder={contact.placeholders.name}
          autoComplete="name"
        />
      </FormField>

      <FormField
        id="contact-email"
        label={contact.labels.email}
        required
        error={errors.email}
        errorId="contact-email-error"
      >
        <TextInput
          {...field("contact-email", "email", "email", emailRef)}
          placeholder={contact.placeholders.email}
          autoComplete="email"
        />
      </FormField>

      <FormField
        id="contact-message"
        label={contact.labels.message}
        required
        error={errors.message}
        errorId="contact-message-error"
      >
        <TextArea
          {...field("contact-message", "message", undefined, messageRef)}
          placeholder={contact.placeholders.message}
          maxLength={2000}
        />
      </FormField>

      <div className={styles.actions}>
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? contact.sending : contact.submit}
        </Button>
        <FormStatus status={status} feedback={feedback} />
      </div>
    </form>
  );
}

export default ContactForm;