const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
    default: "https://picsum.photos/1920",
  },
  price:{
    type: Number,
    required:true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Products", postSchema);
