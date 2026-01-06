import express from "express";
import {
  RazorpayOrder,
  verifyPayment,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/razorpayorder", RazorpayOrder);
router.post("/verifypayment", verifyPayment);

export default router;
