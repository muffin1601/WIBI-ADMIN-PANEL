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
    let admin = await Profile.findOne({ username: "admin" });

    //  HASH PASSWORD
    const hashedPassword = await bcrypt.hash("HELLO23#df", 10);

    if (admin) {
      console.log("Updating existing admin password...");
      admin.password = hashedPassword;
      admin.role = "super_admin";
      admin.is_active = true;
      await admin.save();
      console.log("✅ Admin password updated");
    } else {
      //  CREATE ADMIN
      await Profile.create({
        username: "admin",
        password: hashedPassword,
        role: "super_admin",
        is_active: true
      });
      console.log("✅ Admin user created");
    }
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();
