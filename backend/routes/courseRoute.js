import express from "express"
import { createCourse, getCourseById, getCreatorCourses, getPublishedCourses, removeCourse } from "../controllers/courseController.js";
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/create",isAuth,createCourse);
router.get("/getpublished",getPublishedCourses);
router.get("/getCreatorCourses",isAuth,getCreatorCourses);
router.post("/editcourse/:courseId",isAuth,upload.single("thumbnail"));
router.get("/getcoursebyid/:courseId",isAuth,getCourseById);
router.delete("/remove/:courseId",isAuth,removeCourse);


export default router;