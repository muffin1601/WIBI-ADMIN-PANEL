// src/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  subcategory: String,
  status: {
    type: String,
    enum: ["Active", "Draft", "Archived"],
    default: "Draft"
  },
    data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);


