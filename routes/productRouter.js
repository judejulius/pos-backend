require("dotenv").config;

const express = require("express");
const Product = require("../models/product");
const auth = require("../middleware/auth");
const { getProduct } = require("../middleware/finders");

const router = express.Router();

// GET all posts
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one post
router.get("/:id", [auth, getProduct], (req, res, next) => {
  res.send(res.product);
});

// CREATE a product
router.post("/", auth, async (req, res, next) => {
  const { title, category,description, img, price } = req.body;

  let product;

  img
    ? (post = new Product({
        title,
        category,
        description,
        img,
        price
      }))
    : (post = new Product({
        title,
        category,
        description,
        price
      }));

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a post
router.put("/:id", [auth, getProduct], async (req, res, next) => {
  if (req.user._id !== res.product.author)
    res
      .status(400)
      .json({ message: "You do not have the permission to update products" });
  const { title, body, img } = req.body;
  if (title) res.product.title = title;
  if (body) res.product.body = body;
  if (img) res.product.img = img;

  try {
    const updatedProduct = await res.product.save();
    res.status(201).send(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a post
router.delete("/:id", [auth, getProduct], async (req, res, next) => {
  if (req.user._id !== res.product.author)
    res
      .status(400)
      .json({ message: "You do not have the permission to delete products" });
  try {
    await res.product.remove();
    res.json({ message: "Deleted product" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
