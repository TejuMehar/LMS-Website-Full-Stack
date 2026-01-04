import { uploadOnCloudinary } from "../config/cloudinary";
import Lacture from "../model/lactureModel";

export const createLacture = async (req, res) => {
  try {
    const { lactureTitle } = req.body;
    const { courseId } = req.params;

    if (!lactureTitle || !courseId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const lacture = new Lacture.create({ lactureTitle });
    const course = await Course.findById(courseId);

    if (course) {
      course.lactures.push(lacture._id);
    }
    course.populate("lactures");
    course.save();

    return res.status(201).json({ lacture, course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: ` Failed to Create Lacture error ${error}` });
  }
};



export const getCourseLactures = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lactures");
    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }
    await course.save();
    return res.status(200).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get Course Lactures ${error}` });
  }
};



export const editLacture = async (req, res) => {
  try {
    const { lactureId } = req.params;
    const { isPreviewFree, lactureTitle } = req.body();
    const lacture = await Lacture.findById(lactureId);
    if (!lacture) {
      return res.status(404).json({ message: "Lacture Not Found" });
    }

    let videoUrl;

    if (req.file) {
      videoUrl = await uploadOnCloudinary(req.file.path);
      lacture.videoUrl = videoUrl;
    }

    if (lactureTitle) {
      lacture.lactureTitle = lactureTitle;
    }
    lacture.isPreviewFree = isPreviewFree;

    await lacture.save();
    return res.status(201).json(lacture);
  } catch (error) {
    return res.status(500).json({ message: `Failed to Edit Course ${error}` });
  }
};

export const removeLacture = async (req, res) => {
  try {
    const { lactureId } = req.params;
    const lacture = await Lacture.findByIdAndDelete(lactureId);

    if (!lacture) {
      return res.status(400).json({ message: "Lacture not Found" });
    }
    await Course.updateOne(
      { lactures: lactureId },
      { $pull: { lcatures: lactureId } }
    );

    return res.status(200).json({ message: "Lacture Removed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to Remove Course ${error}` });
  }
};
