// src/models/Subcategory.js
import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: String,
  image: String,
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  parent_subcategory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory"
  }
}, { timestamps: true });

export default mongoose.model("Subcategory", subcategorySchema);
