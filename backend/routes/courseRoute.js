import express from "express"
import { createCourse, getCourseById, getCreatorCourses, getPublishedCourses, removeCourse } from "../controllers/courseController";
import isAuth from "../middleware/isAuth.js"

const router = express.Router();

router.post("/create",isAuth,createCourse);
router.get("/getpublished",getPublishedCourses);
router.get("/getCreatorCourses",isAuth,getCreatorCourses);
router.post("/editcourse/:courseId",isAuth,upload.single("thumbnail"));
router.get("/getcoursebyid/:courseId",isAuth,getCourseById);
router.delete("/remove/:courseId",isAuth,removeCourse);