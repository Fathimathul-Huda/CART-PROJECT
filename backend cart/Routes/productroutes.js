const express = require("express");
const router = express.Router();
const { Product } = require("../models/schmas");
const authenticate = require("../middleware/authenticate");
const authorizeOwner = require("../middleware/authorizeowner");

// GET all products (public)
router.get("/view", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

// GET single product (public)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Invalid product ID", error: err.message });
  }
});

// CREATE product (protected)
router.post("/", authenticate, async (req, res) => {
  try {
    const { name, price, description, quantity, image } = req.body;
    if (!name || !price || !quantity) {
      return res.status(400).json({ message: "Name, price and quantity are required" });
    }

    const product = new Product({
      name,
      price,
      description,
      quantity,
      creatorId: req.user.id,
      image

    });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Error creating product", error: err.message });
  }
});

// UPDATE product (protected + owner)
router.put("/:id", authenticate, authorizeOwner, async (req, res) => {
  try {
    const { name, price, description, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res.status(400).json({ message: "Name, price and quantity are required" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.quantity = quantity;
    product.updatedAt = Date.now();

    await product.save();
    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
});

// DELETE product (protected + owner)
router.delete("/:id", authenticate, authorizeOwner, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
});

module.exports = router;
