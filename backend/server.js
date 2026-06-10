import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // 1. Ye add kiya
import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// 2. CORS allow karna zaroori hai taake frontend connect ho sakay
app.use(
  cors({
    origin: "http://localhost:5175", // Aapka frontend is port par chal raha hai
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/products", productRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    // 3. Is line ko theek kiya (ye "*" hota hai)
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  // 4. Isay 5000 ke bajaye PORT variable kiya
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
