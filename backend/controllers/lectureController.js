import { uploadOnCloudinary } from "../config/cloudinary.js";
import Lecture from "../model/lectureModel.js";
import Course from "../model/courseModel.js";

/* ================= CREATE LECTURE ================= */
export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.lectures.push(lecture._id);
    await course.save();

    const populatedCourse = await Course.findById(courseId).populate(
      "lectures"
    );

    return res.status(201).json({
      message: "Lecture created successfully",
      lecture,
      course: populatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to create lecture: ${error.message}`,
    });
  }
};

/* ================= GET COURSE LECTURES ================= */
export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({
      message: `Failed to get course lectures: ${error.message}`,
    });
  }
};

/* ================= EDIT LECTURE ================= */
export const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { isPreviewFree, lectureTitle } = req.body;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    if (req.file) {
      const videoUrl = await uploadOnCloudinary(req.file.path);
      lecture.videoUrl = videoUrl;
    }

    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }

    if (isPreviewFree !== undefined) {
      lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();

    return res.status(200).json({
      message: "Lecture updated successfully",
      lecture,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to edit lecture: ${error.message}`,
    });
  }
};

/* ================= REMOVE LECTURE ================= */
export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({
      message: "Lecture removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to remove lecture: ${error.message}`,
    });
  }
};
