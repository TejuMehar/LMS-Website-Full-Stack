import razorpay from "razorpay";
import dotenv from "dotenv";
import Course from "../model/courseModel.js";
import User from "../model/userModel.js";

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
      receipt: courseId.toString(),
    };

    const order = await RazorpayInstance.orders.create(options);

    // Return order with key_id for frontend
    return res.status(200).json({
      ...order,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay order error:", err);
    return res
      .status(500)
      .json({ message: `Failed to Create Razorpay order: ${err.message}` });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { courseId, userId, razorpay_order_id } = req.body;

    if (!courseId || !userId || !razorpay_order_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const orderInfo = await RazorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status == "paid") {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }

      const course = await Course.findById(courseId).populate("lectures");
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
        await course.save();
      }

      return res
        .status(200)
        .json({ message: "Payment Verified And Enrolled Successfully" });
    } else {
      return res.status(400).json({ message: "Payment Failed!" });
    }
  } catch (err) {
    console.error("Payment verification error:", err);
    return res
      .status(500)
      .json({
        message: `Internal Server Error During Payment Verification: ${err.message}`,
      });
  }
};
