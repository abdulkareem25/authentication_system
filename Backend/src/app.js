import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));


app.use("/api/auth", authRoutes);


app.get("/health", (req, res) => {
  res.status(200).json({ 
    success: true,
    message: "Server is healthy" 
  });
});

export default app;