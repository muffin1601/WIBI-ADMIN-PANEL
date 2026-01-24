import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed

    email: String,
    full_name: String,

    role: {
      type: String,
      enum: ["user", "admin", "super_admin"],
      default: "user"
    },

    avatar_url: String,
    phone: String,
    is_active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
