const express = require("express");
const Product = require("../models/schmas");
const { auth, admin } = require("../middleware/authenticate");

const router = express.Router();

router.post("/add", auth, admin, async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

router.get("/all", async (req, res) => {
  res.json(await Product.find());
});

router.put("/edit/:id", auth, admin, async (req, res) => {
  res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/delete/:id", auth, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;
