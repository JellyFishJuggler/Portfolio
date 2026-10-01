/**
 * All copy for the contact page, kept out of the components so the page
 * needs no changes when the wording or the mail callback is swapped.
 */
export const contact = {
  heading:
    "If you prefer not to fill out forms, feel free to email me directly and let's talk.",
  labels: {
    name: "Full name",
    email: "Email",
    message: "Message",
  },
  placeholders: {
    name: "ex. John Smith",
    email: "hello@website.com",
    message: "Write your message…",
  },
  submit: "Send message",
  sending: "Sending…",
  errors: {
    name: "Please enter your name.",
    email: "Please enter your email.",
    invalidEmail: "Please enter a valid email.",
    message: "Please enter a message.",
  },
  subject: (name) => `Portfolio contact from ${name}`,
  status: {
    success: "Thanks for reaching out. I'll get back to you soon.",
    error: "Something went wrong. Please try again or email me directly.",
    opening: "Opening your email app…",
  },
};

export default contact;