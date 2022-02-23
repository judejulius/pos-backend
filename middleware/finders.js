// This is used to find various Schemas
const User = require("../models/user");
const Post = require("../models/product");

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);

    if (!user) res.status(404).json({ message: "Could not find user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

async function getProduct(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (!post) res.status(404).json({ message: "Could not find post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.post = post;
  next();
}

module.exports = { getUser, getProduct };
