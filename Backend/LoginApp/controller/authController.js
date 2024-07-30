const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const User = require("../model/userModel");
const config = require("../config");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Register Endpoint
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Validate request body
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Encrypt password
    const hashPassword = await bcrypt.hash(password, 8);
    console.log("Hashed Password:", hashPassword);

    // Create user
    const user = new User({
      name,
      email,
      password: hashPassword,
      phone,
      role: role ? role : "User",
    });

    await user.save();

    return res.status(201).json({ message: "Registration Successful!", user });
  } catch (err) {
    console.error("Error while registering user:", err.message);
    return res
      .status(500)
      .json({ message: "Error while registering user", error: err.message });
  }
});

// Login Endpoint
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, token: "Error while logging in" });
    if (!user)
      return res
        .status(400)
        .send({ auth: false, token: "Invalid credentials" });

    const passIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passIsValid)
      return res
        .status(400)
        .send({ auth: false, token: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400,
    }); // 24 hours
    res.send({ auth: true, token });
  });
});

// Get All Users Endpoint
router.get("/users", (req, res) => {
  User.find({}, (err, data) => {
    if (err)
      return res.status(500).send("There was a problem finding the users.");
    res.send(data);
  });
});

// Get User Info Endpoint
router.get("/userInfo", (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    User.findById(decoded.id, (err, user) => {
      if (err)
        return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      res.send(user);
    });
  });
});

module.exports = router;
