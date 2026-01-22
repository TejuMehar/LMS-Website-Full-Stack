import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaStar, FaPlay, FaBook, FaClock } from "react-icons/fa";
import Navbar from "../components/Navbar";
import empty from "../assets/empty.jpg";
import { serverUrl } from "../App";

function MyEnrolledCourses() {
  const { userData } = useSelector((state) => state.user);
  const { courseData } = useSelector((state) => state.course);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.enrollCourses && courseData) {
      const enrolled = courseData.filter((course) =>
        userData.enrollCourses.includes(course._id),
      );
      setEnrolledCourses(enrolled);
    }
  }, [userData, courseData]);

  const handleContinueLearning = (courseId) => {
    navigate(`/viewlecture/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex items-center gap-4 mb-8">
          <IoMdArrowRoundBack
            className="text-gray-700 w-8 h-8 cursor-pointer hover:text-black transition-colors"
            onClick={() => navigate("/")}
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              My Learning Journey
            </h1>
            <p className="text-gray-600">
              Continue your progress • {enrolledCourses.length} courses enrolled
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaBook className="text-blue-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {enrolledCourses.length}
                </h3>
                <p className="text-gray-600">Courses Enrolled</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FaPlay className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {enrolledCourses.reduce(
                    (total, course) => total + (course.lectures?.length || 0),
                    0,
                  )}
                </h3>
                <p className="text-gray-600">Total Lectures</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaClock className="text-purple-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">∞</h3>
                <p className="text-gray-600">Lifetime Access</p>
              </div>
            </div>
          </div>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {enrolledCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      course.thumbnail
                        ? `${serverUrl}/${course.thumbnail}`
                        : empty
                    }
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = empty;
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Enrolled
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.subTitle || course.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span>4.8</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaPlay className="text-gray-400" />
                      <span>{course.lectures?.length || 0} lectures</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>0%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleContinueLearning(course._id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <FaPlay className="w-4 h-4" />
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
              <FaBook className="text-gray-400 w-16 h-16" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Courses Enrolled Yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start your learning journey by exploring our wide range of courses
              and enroll in the ones that interest you.
            </p>
            <button
              onClick={() => navigate("/allcourses")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Explore Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyEnrolledCourses;
