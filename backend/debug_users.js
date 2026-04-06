import mongoose from "mongoose";
import Profile from "./models/Profile.js";
import dotenv from "dotenv";

dotenv.config();

async function listUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const users = await Profile.find({});
    console.log("Users in DB:", users.map(u => ({ username: u.username, role: u.role, is_active: u.is_active })));
    process.exit(0);
  } catch (err) {
    console.error("Error listing users:", err);
    process.exit(1);
  }
}

listUsers();
