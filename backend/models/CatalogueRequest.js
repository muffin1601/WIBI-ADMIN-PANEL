// src/models/CatalogueRequest.js
import mongoose from "mongoose";

const catalogueRequestSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  location: String,
  product_id: String,
  product_name: String
}, { timestamps: true });

export default mongoose.model("CatalogueRequest", catalogueRequestSchema);
