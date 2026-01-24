// src/models/NewsletterEmail.js
import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  email: { type: String, unique: true }
}, { timestamps: true });

export default mongoose.model("NewsletterEmail", newsletterSchema);
