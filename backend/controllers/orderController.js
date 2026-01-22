import razorpay from "razorpay";
import dotenv from "dotenv";
import Course from "../model/courseModel.js";
import User from "../model/userModel.js";
import crypto from "crypto";

dotenv.config();

const RazorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const RazorpayOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `${courseId}.toString()`,
    };

    const order = await RazorpayInstance.orders.create(options);

    // Return order with key_id for frontend
    return res.status(200).json(order);
  } catch (err) {
    console.error("Razorpay order error:", err);
    return res
      .status(500)
      .json({ message: `Failed to Create Razorpay order: ${err.message}` });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
      userId,
    } = req.body;

    console.log("Payment verification request:", {
      razorpay_order_id,
      razorpay_payment_id,
      courseId,
      userId
    });

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courseId ||
      !userId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔐 Signature verification
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    console.log("Signature verification:", {
      generated: generatedSignature,
      received: razorpay_signature,
      match: generatedSignature === razorpay_signature
    });

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // ✅ Enroll user
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: "User or Course not found" });
    }

    if (!user.enrollCourses.includes(courseId)) {
      user.enrollCourses.push(courseId);
      await user.save();
      console.log(`User ${userId} enrolled in course ${courseId}`);
    }

    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
      console.log(`Course ${courseId} updated with student ${userId}`);
    }

    return res
      .status(200)
      .json({ message: "Payment verified & enrollment successful" });
  } catch (err) {
    console.error("Payment verification error:", err);
    return res.status(500).json({
      message: "Internal Server Error During Payment Verification",
    });
  }
};
