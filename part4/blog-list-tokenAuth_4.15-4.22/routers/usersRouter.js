const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1
  });

  res.json(users.map(usr => usr));
});

usersRouter.post("/", async (req, res, next) => {
  const { name, password } = req.body;
  let { username } = req.body;
  username = username.replace(/\s/g, "").toLowerCase(); // may be implemented from frontend side

  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      name,
      hashedPassword
    });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
