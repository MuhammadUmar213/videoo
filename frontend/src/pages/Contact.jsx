import { useId, useState } from "react";
import SEO from "../components/SEO";
import { sendContactMessage } from "../services/api";
import { site } from "../data/site";

const emptyForm = { name: "", email: "", subject: "", message: "" };

const fields = [
  {
    key: "name",
    label: "Name",
    type: "text",
    placeholder: "Your name",
    autoComplete: "name",
    maxLength: 100,
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "your@email.com",
    autoComplete: "email",
    maxLength: 254,
  },
  {
    key: "subject",
    label: "Subject",
    type: "text",
    placeholder: "What is this about?",
    autoComplete: "off",
    maxLength: 150,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const fieldId = useId();
  const messageId = `${fieldId}-message`;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    setStatus("sending");
    setError("");

    try {
      await sendContactMessage(formData);
      setFormData(emptyForm);
      setStatus("sent");
    } catch (err) {
      // The form used to report success unconditionally without sending
      // anything, so a failure looked identical to a delivered message.
      setError(err.message);
      setStatus("idle");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <SEO
        title="Contact VidSavio"
        description="Contact VidSavio support or submit rights-holder and DMCA inquiries."
        path="/contact"
      />
      <h1 className="mb-8 text-3xl font-bold text-slate-950 sm:text-4xl">
        Contact Us
      </h1>

      <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="mb-6 text-2xl font-bold text-slate-950">
            Get in Touch
          </h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="mb-2 text-lg font-bold">Email</h3>
              <a
                className="font-semibold text-fuchsia-600 underline"
                href={`mailto:${site.supportEmail}`}
              >
                {site.supportEmail}
              </a>
            </div>

            <div className="card">
              <h3 className="mb-2 text-lg font-bold">DMCA Takedown</h3>
              <a
                className="font-semibold text-fuchsia-600 underline"
                href={`mailto:${site.dmcaEmail}`}
              >
                {site.dmcaEmail}
              </a>
              <p className="mt-2 text-sm text-slate-500">
                For copyright concerns only
              </p>
            </div>

            <div className="card">
              <h3 className="mb-2 text-lg font-bold">Response Time</h3>
              <p className="text-slate-600">24-48 hours typically</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-bold text-slate-950">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="card" noValidate>
            {fields.map((field) => (
              <div key={field.key} className="mb-4">
                <label
                  htmlFor={`${fieldId}-${field.key}`}
                  className="mb-2 block font-bold"
                >
                  {field.label}
                </label>
                <input
                  id={`${fieldId}-${field.key}`}
                  type={field.type}
                  name={field.key}
                  value={formData[field.key]}
                  onChange={handleChange}
                  className="input-primary"
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  maxLength={field.maxLength}
                  required
                />
              </div>
            ))}

            <div className="mb-6">
              <label htmlFor={messageId} className="mb-2 block font-bold">
                Message
              </label>
              <textarea
                id={messageId}
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="input-primary"
                placeholder="Your message..."
                rows="5"
                maxLength={5000}
                required
              />
            </div>

            <div aria-live="polite">
              {status === "sent" && (
                <p className="mb-4 rounded-lg bg-green-50 p-4 text-center font-bold text-green-800">
                  Message sent. We will respond within 24-48 hours.
                </p>
              )}
              {error && (
                <p
                  role="alert"
                  className="mb-4 rounded-lg bg-red-50 p-4 text-center font-semibold text-red-800"
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
