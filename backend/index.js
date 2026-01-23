import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import lactureRouter from "./routes/lactureRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://lms-website-full-stack-1.onrender.com",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/lecture", lactureRouter);
app.use("/api/order", paymentRouter);
app.use("/api/review", reviewRouter);

app.get("/", (req, res) => {
  res.send("Hello From Tejas Mehar");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
