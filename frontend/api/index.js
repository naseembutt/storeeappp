import express from "express";
import cors from "cors";
import serverless from "serverless-http";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
  res.json({ success: true, data: [] });
});

app.post("/api/products", (req, res) => {
  res.status(201).json({
    success: true,
    data: req.body,
  });
});

export default serverless(app);
