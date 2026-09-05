import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import errorHandler from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.get("/health", (req, res) => {
  res.status(200).json({ 
    success: true,
    message: "Server is healthy" 
  });
});

app.use(errorHandler);

export default app;