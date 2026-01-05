// src/pages/EditLecture.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../App";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const EditLecture = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId, lectureId } = useParams();
  const { lectureData } = useSelector((state) => state.lecture);
  const selectedLecture = lectureData.find(
    (lecture) => lecture._id == lectureId
  );
  const [lectureTitle, setLectureTitle] = useState(
    selectedLecture.lectureTitle
  );
  const [videoUrl, setVideoUrl] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const formData = new FormData();
  formData.append("lectureTitle", lectureTitle);
  formData.append("videoUrl", videoUrl);
  formData.append("isPreviewFree", isPreviewFree);

  const handleEditlecture = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + `/api/lecture/editlecture/${lectureId}`,
        formData,
        { withCredentials: true }
      );
      dispatch(setLectureData([...lectureData, result.data]));
      toast.success("Lecture Updated", {
        position: "top-center",
        autoClose: 3000,
      });
      console.log(result.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed To Edit Lecture");
    }
  };

  const handleRemoveLecture = async () => {
    setLoading1(true);
    try {
      const result = await axios.delete(
        serverUrl + `/api/lecture/removelecture/${lectureId}`,
        { withCredentials: true }
      );
      console.log(result.data);
      navigate(`/createlecture/${courseId}`);
      toast.success("Lecture Removed Succesfully", {
        position: "top-center",
        autoClose: "1000",
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed To Remove Lecture");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-[100px]">
      {/* Back icon */}
      <div
        className="flex items-center mb-6 cursor-pointer"
        onClick={() => navigate(`/createlecture/${courseId}`)}
      >
        <IoMdArrowRoundBack size={28} />
        <span className="ml-2 text-lg font-medium">Back</span>
      </div>

      {/* Page title */}
      <h2 className="text-2xl font-bold mb-6">Edit Your Lecture</h2>

      {/* Lecture Title Input */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Lecture Title *</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter lecture title"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
        />
      </div>

      {/* Video Input */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Upload Video *</label>
        <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
          <span className="text-gray-500">
            {videoUrl ? videoUrl.name : "Click or drag your video here"}
          </span>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoUrl(e.target.files[0])}
            required
            className="hidden"
          />
        </label>
      </div>

      {/* Free Video Checkbox */}
      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          id="freeVideo"
          className="mr-2"
          checked={isPreviewFree}
          onChange={() => setIsPreviewFree((prev) => !prev)}
        />
        <label htmlFor="freeVideo" className="font-medium">
          Is this Video Free ?
        </label>
      </div>

      {loading ? <p>Uploading Video..... Please wait.</p> : ""}

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleEditlecture}
          className="px-6 py-2 bg-black   text-white rounded-md hover:bg-gray-600 transition"
          disabled={loading}
        >
          {loading ? <ClipLoader size={25} color="white" /> : " Update Lecture"}
        </button>

        <button
          onClick={handleRemoveLecture}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          {loading1 ? <ClipLoader size={20} color="white" /> : "Remove Lecture"}
        </button>
      </div>
    </div>
  );
};

export default EditLecture;
