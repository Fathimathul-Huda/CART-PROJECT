const { Product } = require("../models/schmas"); 

async function authorizeOwner(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Job not found" });

    if (product.creatorId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    req.product = product; // attach job to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid job ID", error: err.message });
  }
}

module.exports = authorizeOwner;
