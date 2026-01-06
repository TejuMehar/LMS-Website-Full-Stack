import React, { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import empty from "../assets/empty.jpg";
import { setSelectedCourse } from "../redux/courseSlice";
import { FaStar } from "react-icons/fa6";
import { useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { serverUrl } from "../App";
import axios from "axios";
import Card from "../components/Card";
import { toast } from "react-toastify";

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
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const { selectedCourse } = useSelector((state) => state.course);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [creatorCourses, setCreatorCourses] = useState();

  const fetchCourse = async () => {
    courseData.forEach((course) => {
      if (course._id === courseId) {
        dispatch(setSelectedCourse(course));
        console.log(course); // log the actual course object
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
            { withCredentials: true }
          );
          console.log(result.data);
          dispatch(setCreatorData(result.data));
        } catch (err) {
          console.log(err);
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourse = courseData.filter(
        (course) =>
          course.creator === creatorData?._id && course._id !== courseId
      );
      setCreatorCourses(creatorCourse);
    }
  }, [creatorData, courseData]);

  useEffect(() => {
    fetchCourse();
  }, [courseData, courseId]);

  const handleEnroll = async (userId, courseId) => {
    try {
      // Create Razorpay order
      const orderData = await axios.post(
        serverUrl + "/api/order/razorpayorder",
        { courseId, userId },
        { withCredentials: true }
      );
      const order = orderData.data;

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Razorpay key from backend
        amount: order.amount,
        currency: order.currency,
        name: selectedCourse?.title || "Course Enrollment",
        description: `Enrollment for ${selectedCourse?.title}`,
        order_id: order.id,
        handler: async function (response) {
          // Payment successful - verify payment
          try {
            const verifyResult = await axios.post(
              serverUrl + "/api/order/verifypayment",
              {
                ...response,
                courseId,
                userId,
                // razorpay_order_id: response.razorpay_order_id,
                // razorpay_payment_id: response.razorpay_payment_id,
                // razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            toast.success(
              verifyResult.data.message ||
                "Payment successful! You are now enrolled.",
              {
                position: "top-center",
                autoClose: 3000,
              }
            );

            // Refresh page or update state
            window.location.reload();
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error(
              error.response?.data?.message || "Payment verification failed",
              {
                position: "top-center",
                autoClose: 3000,
              }
            );
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

      // Open Razorpay payment window
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Enrollment error:", err);
      toast.error(err.response?.data?.message || "Failed to initiate payment", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">
        {/* top Section */}
        <div className="flex  flex-col md:flex-row gap-6 ">
          {/* thumnail */}
          <div className="w-full md:w-1/2 ">
            <IoMdArrowRoundBack
              className="text-[black] w-[22px] h-[22px] cousor-pointer"
              onClick={() => navigate("/")}
            />
            {selectedCourse?.thumbnail ? (
              <img src={selectedCourse?.thumbnail} className="rounded-[10px]" />
            ) : (
              <img src={empty} />
            )}
          </div>

          {/* course info */}
          <div className="flex-1 space-y-2 mt-[20px]">
            <h2 className="text-2xl font-bold ">{selectedCourse?.title}</h2>
            <p className="text-gray-600">{selectedCourse?.subTitle}</p>

            <div className="flex items-start flex-col justify-start ">
              {/* rating */}
              <div className="text-yellow-500 font-medium flex gap-2">
                <span className="flex items-center justify-start gap-2">
                  <FaStar />
                  {""}5
                </span>
                <span className="text-gray-500">(1,200 Reviews)</span>
              </div>
              {/* Price  */}
              <div className="text-lg font-semibold text-black gap-3 ">
                <span className="text-lg font-semibold text-black gap-2">
                  ₹ {selectedCourse?.price}
                </span>
                &nbsp;
                <span className="line-through text-sm text-gray-400 ">599</span>
              </div>
              {/* features */}
              <ul className="text-lg text-gray-500 space-y-1 pt-2">
                {commonCourseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              {/* enrolled now */}
              <button
                className="bg-[black] text-white px-6 py-2 rounded hover:bg-gray-700 mt-3"
                onClick={() => handleEnroll(userData._id, courseId)}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* what you'll learn  Section */}
        <div className="text-small">
          <h1 className="text-xl font-semibold mb-2 ">What You'll learn </h1>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Learn {selectedCourse?.category} Beginning</li>
          </ul>
        </div>

        {/* Who THis course For  */}
        <div className="text-small">
          <h2 className="text-xl font-semibold mb-2">
            Who This course is For{" "}
          </h2>
          <p className="text-gray-700">
            {" "}
            Beginning, aspiring developers and professional looking to upgrade
            skills
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200 ">
            <h2 className="text-xl font-bold  mb-1 text-gray-800 ">
              {" "}
              Course Curriculam
            </h2>
            <p className="text-small text-gray-500 mb-4 ">
              {" "}
              {selectedCourse?.lectures?.length} Lectures
            </p>
            {/* lectures */}
            <div className="flex flex-col gap-3 mt-4">
              {selectedCourse?.lectures?.map((lecture, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-4 py-3 border rounded-lg 
                 hover:bg-blue-50 hover:border-blue-500 
                 transition-all duration-200 ${
                   lecture.isPreviewFree
                     ? "hover:bg-gray-100 cursor-pointer"
                     : "cursor-not-allowed opacity-60  border-gray-200"
                 }
                 ${
                   selectedLecture?.title == lecture?.lectureTitle
                     ? "bg-gray-100 border-gray-400"
                     : ""
                 }`}
                  disabled={!lecture.isPreviewFree}
                  onClick={() => {
                    if (lecture?.isPreviewFree) {
                      setSelectedLecture(lecture);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-gray-700">
                      {lecture.isPreviewFree ? <FaCirclePlay /> : <FaLock />}
                    </span>

                    <span className="font-medium text-gray-800">
                      {lecture?.lectureTitle}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200 ">
            <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center  ">
              {selectedLecture?.videoUrl ? (
                <video
                  className="w-full h-full object-cover"
                  src={selectedLecture?.videoUrl}
                  controls
                />
              ) : (
                <span className="text-white text-sm ">
                  Select a Preview lecture to watch{" "}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t p-6 ">
          <h2 className="text-xl font-semibold mb-2 ">Write a Reviews</h2>
          <div className="mb-4">
            {/* Rating Stars */}
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className="text-gray-300" />
              ))}
            </div>

            {/* Review Input */}
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Write your review..."
              rows={3}
            />

            {/* Submit Button */}
            <button
              className="mt-3 bg-black text-white px-6 py-2 rounded-lg 
               hover:bg-gray-800 transition-all duration-200"
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* For Creator info */}
        <div className="flex items-center gap-4 pt-4 border-t ">
          {creatorData?.photoUrl ? (
            <img
              src={creatorData?.photoUrl}
              alt=""
              className="w-16 h-16 rounded-full object-cover  border-2 border-gray-400"
            />
          ) : (
            <img
              src={empty}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-lg font-semibold ">{creatorData?.name}</h2>
            <p className="mg:text-sm text-gray-600 text-[13px]">
              {creatorData?.description}
            </p>
            <p className="mg:text-sm text-gray-600 text-[11px]">
              {creatorData?.email}
            </p>
          </div>
        </div>

        <div>
          <p>Other Published Courses By the Educator - </p>
        </div>

        <div className="w-full transection-all duration-300 py-[20px] flex items-center justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]">
          {creatorCourses?.map((course, index) => (
            <Card
              thumbnail={course.thumbnail}
              id={course._id}
              price={course.price}
              category={course.category}
              title={course.title}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
