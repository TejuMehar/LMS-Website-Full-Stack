import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import empty from "../assets/empty.jpg";
import { setSelectedCourse, setCreatorData } from "../redux/courseSlice";
import { FaStar } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { serverUrl } from "../App";
import axios from "axios";
import Card from "../components/Card";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const commonCourseFeatures = [
  "Lifetime access to course",
  "Beginner to Advanced level",
  "Certificate of Completion",
  "Hands-on Projects",
  "Full source code included",
  "24/7 Support",
];

function ViewCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { courseData, creatorData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const { selectedCourse } = useSelector((state) => state.course);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorCourses, setCreatorCourses] = useState();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");

  const fetchCourse = async () => {
    courseData?.forEach((course) => {
      if (course._id === courseId) {
        dispatch(setSelectedCourse(course));
      }
    });
  };

  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(
            serverUrl + "/api/course/getcreator",
            { userId: selectedCourse?.creator },
            { withCredentials: true },
          );
          dispatch(setCreatorData(result.data));
        } catch (err) {
          console.log(err);
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);

  useEffect(() => {
    if (creatorData?._id && courseData?.length > 0) {
      const creatorCourse = courseData.filter(
        (course) =>
          course.creator === creatorData?._id && course._id !== courseId,
      );
      setCreatorCourses(creatorCourse);
    }
  }, [creatorData, courseData]);

  const checkEnrollment = () => {
    const verify = userData?.enrollCourses?.some(
      (c) =>
        (typeof c === "string" ? c : c._id).toString() === courseId?.toString(),
    );

    if (verify) {
      setIsEnrolled(true);
    }
  };

  useEffect(() => {
    fetchCourse();
    checkEnrollment();
    fetchReviews();
  }, [courseData, courseId, userData]);

  const fetchReviews = async () => {
    try {
      const result = await axios.get(
        serverUrl + `/api/review/course/${courseId}`,
      );
      setReviews(result.data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnroll = async (userId, courseId) => {
    if (!userId) {
      toast.error("Please login to enroll in the course", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/login");
      return;
    }

    try {
      const orderData = await axios.post(
        serverUrl + "/api/order/razorpayorder",
        { courseId, userId },
        { withCredentials: true },
      );
      const order = orderData.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: selectedCourse?.title || "Course Enrollment",
        description: `Enrollment for ${selectedCourse?.title}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyResult = await axios.post(
              serverUrl + "/api/order/verifypayment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId,
                userId,
              },
              { withCredentials: true },
            );

            setIsEnrolled(true);

            toast.success("Payment successful! You are now enrolled.", {
              position: "top-center",
              autoClose: 3000,
            });

            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed", {
              position: "top-center",
              autoClose: 3000,
            });
          }
        },
        prefill: {
          name: userData?.name || "",
          email: userData?.email || "",
        },
        theme: {
          color: "#000000",
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled", {
              position: "top-center",
              autoClose: 2000,
            });
          },
        },
      };

      if (!window.Razorpay) {
        toast.error("Payment gateway not loaded. Please refresh the page.", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Enrollment error:", err);
      toast.error("Failed to initiate payment", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleReview = async () => {
    setLoading(true);
    try {
      await axios.post(
        serverUrl + "/api/review/createreview",
        { rating, comment, courseId },
        { withCredentials: true },
      );
      setLoading(false);
      toast.success("Review Added Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Failed to add review", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleUpdateReview = async (reviewId) => {
    setLoading(true);
    try {
      await axios.put(
        serverUrl + `/api/review/update/${reviewId}`,
        { rating: editRating, comment: editComment },
        { withCredentials: true },
      );
      setLoading(false);
      toast.success("Review Updated Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      setEditingReview(null);
      setEditRating(0);
      setEditComment("");
      fetchReviews();
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Failed to update review", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(serverUrl + `/api/review/delete/${reviewId}`, {
        withCredentials: true,
      });
      toast.success("Review Deleted Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete review", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <IoMdArrowRoundBack
              className="text-black w-[22px] h-[22px] cursor-pointer mb-4"
              onClick={() => navigate("/")}
            />
            {selectedCourse?.thumbnail ? (
              <img
                src={selectedCourse?.thumbnail}
                className="rounded-[10px] w-full"
              />
            ) : (
              <img src={empty} className="rounded-[10px] w-full" />
            )}
          </div>

          <div className="flex-1 space-y-2 mt-[20px]">
            <h2 className="text-2xl font-bold">{selectedCourse?.title}</h2>
            <p className="text-gray-600">{selectedCourse?.subTitle}</p>

            <div className="flex items-start flex-col justify-start">
              <div className="text-yellow-500 font-medium flex gap-2">
                <span className="flex items-center justify-start gap-2">
                  <FaStar />5
                </span>
                <span className="text-gray-500">(1,200 Reviews)</span>
              </div>

              <div className="text-lg font-semibold text-black gap-3">
                <span className="text-lg font-semibold text-black gap-2">
                  ₹ {selectedCourse?.price}
                </span>
                &nbsp;
                <span className="line-through text-sm text-gray-400">599</span>
              </div>

              <ul className="text-lg text-gray-500 space-y-1 pt-2">
                {commonCourseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>

              {!isEnrolled ? (
                <button
                  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-700 mt-3"
                  onClick={() => handleEnroll(userData?._id, courseId)}
                >
                  Enroll Now
                </button>
              ) : (
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mt-3"
                  onClick={() => navigate(`/viewlecture/${courseId}`)}
                >
                  Watch Now
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="text-small">
          <h1 className="text-xl font-semibold mb-2">What You'll learn</h1>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Learn {selectedCourse?.category} Beginning</li>
          </ul>
        </div>

        <div className="text-small">
          <h2 className="text-xl font-semibold mb-2">Who This course is For</h2>
          <p className="text-gray-700">
            Beginning, aspiring developers and professional looking to upgrade
            skills
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-1 text-gray-800">
              Course Curriculum
            </h2>
            <p className="text-small text-gray-500 mb-4">
              {selectedCourse?.lectures?.length} Lectures
            </p>

            <div className="flex flex-col gap-3 mt-4">
              {selectedCourse?.lectures?.map((lecture, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-4 py-3 border rounded-lg 
                 hover:bg-blue-50 hover:border-blue-500 
                 transition-all duration-200 ${
                   lecture.isPreviewFree || isEnrolled
                     ? "hover:bg-gray-100 cursor-pointer"
                     : "cursor-not-allowed opacity-60"
                 }`}
                  onClick={() => {
                    if (lecture.isPreviewFree || isEnrolled) {
                      setSelectedLecture(lecture);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {lecture.isPreviewFree || isEnrolled ? (
                        <FaCirclePlay className="text-blue-500" />
                      ) : (
                        <FaLock className="text-gray-400" />
                      )}
                      <span className="font-medium text-gray-800">
                        {lecture.lectureTitle}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {lecture.isPreviewFree
                        ? "Free Preview"
                        : isEnrolled
                          ? "Enrolled"
                          : "Locked"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
              {selectedLecture?.videoUrl ? (
                <video
                  className="w-full h-full object-cover"
                  src={selectedLecture?.videoUrl}
                  controls
                />
              ) : (
                <span className="text-white text-sm">
                  Select a Preview lecture to watch
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Write a Review
          </h2>

          <div className="mb-4">
            <p className="text-gray-700 mb-2">Rate this course:</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-2xl cursor-pointer transition-colors ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Review:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Share your thoughts about this course..."
              rows={4}
            />
          </div>

          <button
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={handleReview}
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Submit Review"}
          </button>
        </div>

        {/* Display Reviews */}
        {reviews.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Course Reviews ({reviews.length})
            </h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    {review.user?.photoUrl ? (
                      <img
                        src={review.user.photoUrl}
                        className="w-12 h-12 rounded-full object-cover"
                        alt={review.user.name}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-600 text-white flex items-center justify-center font-bold">
                        {review.user?.name?.slice(0, 1).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">
                            {review.user?.name}
                          </h4>
                          <div className="flex gap-1">
                            {editingReview === review._id
                              ? // Edit mode stars
                                [1, 2, 3, 4, 5].map((star) => (
                                  <FaStar
                                    key={star}
                                    className={`text-lg cursor-pointer ${
                                      star <= editRating
                                        ? "text-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                    onClick={() => setEditRating(star)}
                                  />
                                ))
                              : // Display mode stars
                                [1, 2, 3, 4, 5].map((star) => (
                                  <FaStar
                                    key={star}
                                    className={`text-sm ${
                                      star <= review.rating
                                        ? "text-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.reviewedAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Edit/Delete buttons for own reviews */}
                        {review.user?._id === userData?._id && (
                          <div className="flex gap-2">
                            {editingReview === review._id ? (
                              <>
                                <button
                                  onClick={() => handleUpdateReview(review._id)}
                                  disabled={loading}
                                  className="
    px-4 py-2 text-sm font-medium text-white
    bg-gradient-to-r from-green-500 to-emerald-600
    rounded-lg shadow-md
    hover:from-green-600 hover:to-emerald-700
    focus:outline-none focus:ring-2 focus:ring-green-400
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
  "
                                >
                                  {loading ? "Updating..." : "Update"}
                                  Save
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingReview(null);
                                    setEditRating(0);
                                    setEditComment("");
                                  }}
                                  className="
    px-4 py-2 text-sm font-medium
    text-gray-600
    bg-gray-100
    rounded-lg
    hover:bg-gray-200 hover:text-gray-800
    focus:outline-none focus:ring-2 focus:ring-gray-300
    transition-all duration-200
  "
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    setEditingReview(review._id);
                                    setEditRating(review.rating);
                                    setEditComment(review.comment);
                                  }}
                                  className="
      inline-flex items-center gap-1
      px-3 py-1.5 text-sm font-medium
      text-blue-600
      bg-blue-50
      rounded-full
      hover:bg-blue-100 hover:text-blue-700
      focus:outline-none focus:ring-2 focus:ring-blue-300
      transition-all
    "
                                >
                                  <FiEdit2 className="text-sm" />
                                  Edit
                                </button>

                                <button
                                  onClick={() => handleDeleteReview(review._id)}
                                  className="
      inline-flex items-center gap-1
      px-3 py-1.5 text-sm font-medium
      text-red-600
      bg-red-50
      rounded-full
      hover:bg-red-100 hover:text-red-700
      focus:outline-none focus:ring-2 focus:ring-red-300
      transition-all
    "
                                >
                                  <FiTrash2 className="text-sm" />
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {editingReview === review._id ? (
                        <textarea
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                          rows={3}
                        />
                      ) : (
                        <p className="text-gray-700">{review.comment}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Creator Info */}
        {creatorData && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              About the Instructor
            </h3>
            <div className="flex items-center gap-4 mb-4">
              {creatorData.photoUrl ? (
                <img
                  src={creatorData.photoUrl}
                  className="w-16 h-16 rounded-full object-cover"
                  alt={creatorData.name}
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
                  {creatorData.name?.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <h4 className="font-semibold text-lg">{creatorData.name}</h4>
                <p className="text-gray-600">{creatorData.role}</p>
                <p className="text-gray-600 text-sm">{creatorData.email}</p>
              </div>
            </div>
            <p className="text-gray-700">
              {creatorData.description || "Experienced educator"}
            </p>
          </div>
        )}

        {/* More Courses by Creator */}
        {creatorCourses && creatorCourses.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              More Courses by {creatorData?.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {creatorCourses.slice(0, 3).map((course) => (
                <Card key={course._id} course={course} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewCourse;
