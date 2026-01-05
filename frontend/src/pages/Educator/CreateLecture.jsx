import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setLectureData } from "../../redux/lectureSlice";
import { FaEdit } from "react-icons/fa";

function CreateLecture() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);

  const handleCreateLecture = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + `/api/lecture/createlecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true }
      );
      dispatch(setLectureData([...lectureData, result.data.lecture]));
      setLoading(false);
      toast.success("Lecture created successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate(`/editcourse/${courseId}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Failed to create lecture", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    const getCourselecture = async () => {
      try {
        const result = await axios.get(
          serverUrl + `/api/lecture/courselecture/${courseId}`,
          { withCredentials: true }
        );
        dispatch(setLectureData(result.data.lectures));
      } catch (err) {
        console.log(err);
      }
    };
    getCourselecture();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-6 relative">
        {/* header */}
        <div className="mb-6 mt-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Let's Add a Lecture
          </h1>
          <p className="text-sm text-gray-500">
            Enter the Title and add Your video lecture to enhance Your course
            Content
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          {/* input Area */}
          <div className="mb-6">
            <label
              htmlFor="lectureTitle"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Lecture Title
            </label>
            <input
              type="text"
              id="lectureTitle"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="eg: Introduction to MERN Stack"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-start gap-3">
            <button
              type="button"
              onClick={() => navigate(`/editcourse/${courseId}`)}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
            >
              Back to Course
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={handleCreateLecture}
            >
              {loading ? (
                <>
                  <ClipLoader size={20} color="white" />
                  Creating...
                </>
              ) : (
                "Create Lecture"
              )}
            </button>
          </div>
        </form>

        {/* lecture area */}
        <div className="space-y-2 ">
          {lectureData?.map((lecture, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-md flex justify-between mt-4 items-center p-3 text-small font-medium  text-gray-700 "
            >
              <span>
                Lecture - {index + 1} : {lecture.lectureTitle}
              </span>
              <span>
                <FaEdit
                  className="text-gray-500 hover:text-blue-400 cursor-pointer"
                  onClick={() =>
                    navigate(`/editlecture/${courseId}/${lecture._id}`)
                  }
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;
