const express = require("express");
const Cart = require("../models/cart");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/add", auth, async (req, res) => {
  const { productId } = req.body;

  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = await Cart.create({ userId: req.user.id, products: [{ productId }] });
  } else {
    cart.products.push({ productId });
    await cart.save();
  }

  res.json(cart);
});

router.get("/my-cart", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
  res.json(cart);
});

module.exports = router;
