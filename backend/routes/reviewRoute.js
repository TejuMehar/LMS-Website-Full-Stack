import express from "express";
import { createReview, getReviews, getCourseReviews, updateReview, deleteReview } from "../controllers/reviewController.js";
import isAuth from "../middleware/isAuth.js";
const router = express.Router();

router.post("/createreview", isAuth, createReview);
router.get("/allreviews", getReviews);
router.get("/course/:courseId", getCourseReviews);
router.put("/update/:reviewId", isAuth, updateReview);
router.delete("/delete/:reviewId", isAuth, deleteReview);

export default router;
