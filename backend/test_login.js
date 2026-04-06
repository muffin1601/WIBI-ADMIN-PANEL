import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Profile from "./models/Profile.js";
import dotenv from "dotenv";

dotenv.config();

async function testLogin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const username = "admin";
    const password = "HELLO23#df";

    const user = await Profile.findOne({ username });
    if (!user) {
      console.log("User not found");
      process.exit(1);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password check result:", isMatch);
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

testLogin();
