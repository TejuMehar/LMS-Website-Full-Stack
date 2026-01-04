import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";

import {
  createLecture,
  editLecture,
  getCourseLecture,
  removeLecture,
} from "../controllers/lectureController.js";

const router = express.Router();

/* ===== CREATE LECTURE ===== */
router.post("/createlecture/:courseId", isAuth, createLecture);

/* ===== GET COURSE LECTURES ===== */
router.get("/courselecture/:courseId", isAuth, getCourseLecture);

/* ===== EDIT LECTURE ===== */
router.post(
  "/editlecture/:lectureId",
  isAuth,
  upload.single("videoUrl"),
  editLecture
);

/* ===== REMOVE LECTURE ===== */
router.delete("/removelecture/:lectureId", isAuth, removeLecture);

export default router;
