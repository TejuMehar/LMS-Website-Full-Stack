import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js"
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser())

 
app.use("/api/auth",authRouter);

app.get("/",(req,res)=>{
    res.send("Hello From Tejas Mehar");
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT }`);
  connectDB();
});