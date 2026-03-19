const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* REGISTER */

exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user" // default role
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

/* LOGIN */

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    /* 🔥 ADMIN LOGIN (from .env) */
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {

      const token = jwt.sign(
        { role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        token,
        user: {
          name: "Admin",
          email,
          role: "admin"
        }
      });
    }

    /* 🔽 NORMAL USER LOGIN */

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user"
      }
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};