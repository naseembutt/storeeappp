import express from "express";
import serverless from "serverless-http";
import mongoose from "mongoose";
import Product from "./backend/model/product.model.js";

const app = express();
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI);

// GET - سارے products لینے کے لیے
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST - نیا product add کرنے کے لیے
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default serverless(app);
