import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, send to backend API
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 gradient-text">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-bold text-lg mb-2">📧 Email</h3>
              <p className="text-gray-600">support@downloadanyvideo.com</p>
              <p className="text-gray-600">admin@downloadanyvideo.com</p>
            </div>

            <div className="card">
              <h3 className="font-bold text-lg mb-2">🔒 DMCA Takedown</h3>
              <p className="text-gray-600">dmca@downloadanyvideo.com</p>
              <p className="text-sm text-gray-500 mt-2">
                For copyright concerns only
              </p>
            </div>

            <div className="card">
              <h3 className="font-bold text-lg mb-2">⏱️ Response Time</h3>
              <p className="text-gray-600">24-48 hours typically</p>
              <p className="text-sm text-gray-500 mt-2">
                We respond to all inquiries
              </p>
            </div>

            <div className="card">
              <h3 className="font-bold text-lg mb-2">🌐 Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-blue-500 hover:text-purple-600">
                  Twitter
                </a>
                <a href="#" className="text-blue-500 hover:text-purple-600">
                  GitHub
                </a>
                <a href="#" className="text-blue-500 hover:text-purple-600">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="card">
            <div className="mb-4">
              <label className="block font-bold mb-2">Name</label>
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
              <label className="block font-bold mb-2">Email</label>
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
              <label className="block font-bold mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input-primary"
                placeholder="What's this about?"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="input-primary"
                placeholder="Your message..."
                rows="5"
                required
              ></textarea>
            </div>

            {submitted ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center font-bold">
                ✅ Message sent! We'll respond soon.
              </div>
            ) : (
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            )}
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg mb-2">
              How long does it take to get a response?
            </h3>
            <p className="text-gray-600">
              We typically respond within 24-48 hours during business days.
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-bold text-lg mb-2">
              Which email should I use?
            </h3>
            <p className="text-gray-600">
              Use <strong>support@downloadanyvideo.com</strong> for general
              inquiries, bug reports, or feature requests. Use{" "}
              <strong>dmca@downloadanyvideo.com</strong> only for copyright/DMCA
              takedown notices.
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-bold text-lg mb-2">Can I report a bug?</h3>
            <p className="text-gray-600">
              Yes! Please describe the issue in detail in the contact form or
              email support@downloadanyvideo.com
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-bold text-lg mb-2">
              Do you accept feature requests?
            </h3>
            <p className="text-gray-600">
              Absolutely! We love hearing suggestions. Send them to
              support@downloadanyvideo.com with "Feature Request" in the
              subject.
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-bold text-lg mb-2">
              Is my personal information safe?
            </h3>
            <p className="text-gray-600">
              Yes, we only use your information to respond to your inquiry. See
              our Privacy Policy for details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
