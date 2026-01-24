import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Profile from "./models/Profile.js";
import dotenv from "dotenv";

dotenv.config();

async function createAdmin() {
  try {
    //  CONNECT TO MONGODB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    //  CHECK IF ADMIN EXISTS
    const exists = await Profile.findOne({ username: "admin" });
    if (exists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    //  HASH PASSWORD
    const hashedPassword = await bcrypt.hash("admin123", 10);

    //  CREATE ADMIN
    await Profile.create({
      username: "admin",
      password: hashedPassword,
      role: "super_admin",
      is_active: true
    });

    console.log("✅ Admin user created");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();
