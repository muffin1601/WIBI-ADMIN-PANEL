// src/models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  image: String,
  catalogue_url: String,
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
