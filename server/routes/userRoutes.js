const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    //check is user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({ message: "User with this email already exist", success: false });
    }
    //hashig the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    return res
      .status(201)
      .send({ message: "User created success fully", data: null, success: true });
  } catch (error) {
    return res.send({ message: error.message, success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    //check is user  exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({ message: "Invalid credentials", success: false });
    }
    const vallidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!vallidPassword) {
      return res.send({ message: "Invalid password", success: false });
    }

    //generate token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
    return res.send({ message: "Success login", success: true, data: token });
  } catch (error) {
    return res.send({ message: error.message, success: false });
  }
});

router.post("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);

    res.send({
      message: "User info fetchd successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,

      success: false,
    });
  }
});
module.exports = router;
