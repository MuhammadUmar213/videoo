import express from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import ContactMessage from "../models/ContactMessage.js";
import { hashValue } from "../utils/security.js";

const router = express.Router();

// Deliberately tighter than the global API limit: this endpoint writes to the
// database and is the obvious target for form spam.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.CONTACT_RATE_LIMIT_MAX || 5),
  message: {
    error: "Too many messages sent. Please try again in a few minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const fields = [
  { key: "name", label: "Name", max: 100 },
  { key: "email", label: "Email", max: 254 },
  { key: "subject", label: "Subject", max: 150 },
  { key: "message", label: "Message", max: 5000 },
];

const validate = (body) => {
  const values = {};

  for (const { key, label, max } of fields) {
    const raw = body?.[key];

    if (typeof raw !== "string" || !raw.trim()) {
      return { error: `${label} is required` };
    }

    const value = raw.trim();
    if (value.length > max) {
      return { error: `${label} must be ${max} characters or fewer` };
    }

    values[key] = value;
  }

  if (!emailPattern.test(values.email)) {
    return { error: "Please enter a valid email address" };
  }

  return { values };
};

router.post("/contact", contactLimiter, async (req, res, next) => {
  try {
    const { error, values } = validate(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error:
          "Our message store is temporarily unavailable. Please email us directly instead.",
      });
    }

    await ContactMessage.create({
      ...values,
      ip_hash: hashValue(req.ip),
    });

    res.status(201).json({ message: "Message received" });
  } catch (err) {
    next(err);
  }
});

export default router;
