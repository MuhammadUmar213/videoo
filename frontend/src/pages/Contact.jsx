import { useState } from "react";
import SEO from "../components/SEO";
import { site } from "../data/site";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SEO
        title="Contact VidSavio"
        description="Contact VidSavio support or submit rights-holder and DMCA inquiries."
        path="/contact"
      />
      <h1 className="mb-8 text-4xl font-bold text-slate-950">Contact Us</h1>

      <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-bold">Get in Touch</h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="mb-2 text-lg font-bold">Email</h3>
              <p className="text-slate-600">{site.supportEmail}</p>
            </div>

            <div className="card">
              <h3 className="mb-2 text-lg font-bold">DMCA Takedown</h3>
              <p className="text-slate-600">{site.dmcaEmail}</p>
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
          <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="card">
            <div className="mb-4">
              <label className="mb-2 block font-bold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-primary"
                placeholder="Your name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-primary"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-bold">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input-primary"
                placeholder="What is this about?"
                required
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block font-bold">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="input-primary"
                placeholder="Your message..."
                rows="5"
                required
              />
            </div>

            {submitted ? (
              <div className="rounded-lg bg-slate-50 p-4 text-center font-bold text-fuchsia-600">
                Message sent. We will respond soon.
              </div>
            ) : (
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
