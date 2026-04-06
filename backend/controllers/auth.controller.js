import Profile from "../models/Profile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //  Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    // Find user
    const user = await Profile.findOne({ username, is_active: true });
    console.log("LOGIN ATTEMPT:", { username, userFound: !!user });

    if (!user) {
      console.log("LOGIN FAILED: User not found or inactive");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //  Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      console.log("LOGIN FAILED: Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //  Allow only admin users
    if (!["admin", "super_admin"].includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //  Send response
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        full_name: user.full_name
      }
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
};
