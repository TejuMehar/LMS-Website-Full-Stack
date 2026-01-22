import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCourse, setCreatorData } from "../redux/courseSlice";
import { FaCirclePlay, FaCheck } from "react-icons/fa6";
import { serverUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import empty from "../assets/empty.jpg";

function ViewLecture() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { courseData, creatorData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const { selectedCourse } = useSelector((state) => state.course);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Check if user is enrolled
    const isEnrolled = userData?.enrollCourses?.some(
      (c) => (typeof c === "string" ? c : c._id).toString() === courseId?.toString()
    );

    if (!isEnrolled) {
      toast.error("You need to enroll in this course first", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate(`/viewcourse/${courseId}`);
      return;
    }

    // Find and set the course
    const course = courseData?.find((course) => course._id === courseId);
    if (course) {
      dispatch(setSelectedCourse(course));
      if (course.lectures && course.lectures.length > 0) {
        setCurrentLecture(course.lectures[0]);
        setCurrentLectureIndex(0);
      }
    }
  }, [courseData, courseId, userData, navigate, dispatch]);

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

  const handleLectureSelect = (lecture, index) => {
    setCurrentLecture(lecture);
    setCurrentLectureIndex(index);
    setShowSidebar(false);
  };

  const handleNextLecture = () => {
    if (currentLectureIndex < selectedCourse?.lectures?.length - 1) {
      const nextIndex = currentLectureIndex + 1;
      setCurrentLecture(selectedCourse.lectures[nextIndex]);
      setCurrentLectureIndex(nextIndex);
    }
  };

  const handlePreviousLecture = () => {
    if (currentLectureIndex > 0) {
      const prevIndex = currentLectureIndex - 1;
      setCurrentLecture(selectedCourse.lectures[prevIndex]);
      setCurrentLectureIndex(prevIndex);
    }
  };

  const markAsCompleted = (lectureId) => {
    if (!completedLectures.includes(lectureId)) {
      setCompletedLectures([...completedLectures, lectureId]);
    }
  };

  if (!selectedCourse) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-md p-4 flex items-center justify-between">
        <GiHamburgerMenu
          className="w-6 h-6 cursor-pointer"
          onClick={() => setShowSidebar(true)}
        />
        <h2 className="text-lg font-bold text-gray-800 truncate">
          {selectedCourse.title}
        </h2>
        <IoMdArrowRoundBack
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate(`/viewcourse/${courseId}`)}
        />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${
          showSidebar ? 'fixed inset-0 z-50 lg:relative lg:inset-auto' : 'hidden'
        } lg:block w-full lg:w-80 bg-white shadow-lg h-screen overflow-y-auto`}>
          <div className="lg:hidden p-4 border-b flex justify-end">
            <IoClose
              className="w-6 h-6 cursor-pointer"
              onClick={() => setShowSidebar(false)}
            />
          </div>

          <div className="p-4 border-b">
            <IoMdArrowRoundBack
              className="hidden lg:block text-black w-6 h-6 cursor-pointer mb-2"
              onClick={() => navigate(`/viewcourse/${courseId}`)}
            />
            <h2 className="text-lg font-bold text-gray-800 truncate">
              {selectedCourse.title}
            </h2>
            <p className="text-sm text-gray-600">
              {selectedCourse.lectures?.length} Lectures
            </p>
          </div>

          <div className="p-2">
            {selectedCourse.lectures?.map((lecture, index) => (
              <button
                key={lecture._id}
                className={`w-full text-left p-3 mb-2 rounded-lg border transition-all duration-200 ${
                  currentLecture?._id === lecture._id
                    ? "bg-blue-50 border-blue-500"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => handleLectureSelect(lecture, index)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {completedLectures.includes(lecture._id) ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaCirclePlay className="text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {index + 1}. {lecture.lectureTitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Creator Info */}
          {creatorData && (
            <div className="p-4 border-t">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Instructor</h3>
              <div className="flex items-center gap-3">
                {creatorData.photoUrl ? (
                  <img
                    src={creatorData.photoUrl}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={creatorData.name}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                    {creatorData.name?.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm truncate">
                    {creatorData.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {creatorData.role}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-video bg-black">
                {currentLecture?.videoUrl ? (
                  <video
                    className="w-full h-full"
                    src={currentLecture.videoUrl}
                    controls
                    onEnded={() => markAsCompleted(currentLecture._id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <p>No video available for this lecture</p>
                  </div>
                )}
              </div>

              <div className="p-4 lg:p-6">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                  {currentLecture?.lectureTitle}
                </h1>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                  <button
                    className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
                    onClick={handlePreviousLecture}
                    disabled={currentLectureIndex === 0}
                  >
                    Previous
                  </button>

                  <span className="text-gray-600 text-sm lg:text-base">
                    {currentLectureIndex + 1} of {selectedCourse.lectures?.length}
                  </span>

                  <button
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    onClick={handleNextLecture}
                    disabled={currentLectureIndex === selectedCourse.lectures?.length - 1}
                  >
                    Next
                  </button>
                </div>

                <div className="mt-4">
                  {!completedLectures.includes(currentLecture?._id) && (
                    <button
                      className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => markAsCompleted(currentLecture._id)}
                    >
                      Mark as Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewLecture;