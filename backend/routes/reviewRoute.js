import express from "express";
import { createReview, getReviews, getCourseReviews } from "../controllers/reviewController.js";
import isAuth from "../middleware/isAuth.js";
const router = express.Router();

router.post("/createreview", isAuth, createReview);
router.get("/allreviews", getReviews);
router.get("/course/:courseId", getCourseReviews);

export default router;
