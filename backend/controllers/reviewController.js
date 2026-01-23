import Course from "../model/courseModel.js";
import Review from "../model/reviewModel.js";
export const createReview = async (req, res) => {
  try {
    const { rating, comment, courseId } = req.body;
    const userId = req.userId;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const alreadyReviewed = await Review.findOne({
      course: courseId,
      user: userId,
    });

    if (alreadyReviewed)
      return res
        .status(400)
        .json({ message: "You have already reviewed this course" });

    const review = new Review({
      course: courseId,
      user: userId,
      rating,
      comment,
    });

    await review.save();
    await course.reviews.push(review._id);

    await course.save();

    return res
      .status(200)
      .json({ message: "Review added successfully", review });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Failed to Create Review ${err.message}` });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = (
      await Review.find({}).populate("user", "name photoUrl role")
    ).sort({ reviewedAt: -1 });
    return res.status(200).json({ reviews });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error while fetching reviews ${err.message}` });
  }
};

export const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const reviews = await Review.find({ course: courseId })
      .populate("user", "name photoUrl role")
      .sort({ reviewedAt: -1 });
    return res.status(200).json({ reviews });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error while fetching course reviews ${err.message}` });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.userId;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this review" });
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    return res.status(200).json({ message: "Review updated successfully", review });
  } catch (err) {
    return res.status(500).json({ message: `Failed to update review ${err.message}` });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.userId;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await Review.findByIdAndDelete(reviewId);
    
    // Remove review from course
    await Course.findByIdAndUpdate(review.course, {
      $pull: { reviews: reviewId }
    });

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: `Failed to delete review ${err.message}` });
  }
};
