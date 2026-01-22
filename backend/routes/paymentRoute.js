import express from "express";
import {
  RazorpayOrder,
  verifyPayment,
} from "../controllers/orderController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.post("/razorpayorder", isAuth, RazorpayOrder);
router.post("/verifypayment", isAuth, verifyPayment);

export default router;
