const express = require("express");
const serverless = require("serverless-http");
const app = express();

app.use(express.json());

app.get("/products", (req, res) => {
  res.json({ success: true, data: [] });
});

module.exports = serverless(app);
