import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 254 },
  subject: { type: String, required: true, maxlength: 150 },
  message: { type: String, required: true, maxlength: 5000 },
  ip_hash: String,
  created_at: { type: Date, default: Date.now },
});

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;
