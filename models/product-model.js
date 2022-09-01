const mongoose = require("mongoose");
const time = require('../time')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the product must be provided"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price of the product must be provided"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description of the product must be provided"],
    trim: true,
  },
  image: {
    type: String,
    // required: true
  },
  review: {
    type: Number,
    default: 4.5,
  },
  category: {
    type: String,
    required: [true, "Category of the product is a must"],
    enum: {
      values: ["supplement", "daily consummable", "hardware", "makeup", "hair", "food"],
      message: "{VALUE} is not supported",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model("Product", productSchema);
