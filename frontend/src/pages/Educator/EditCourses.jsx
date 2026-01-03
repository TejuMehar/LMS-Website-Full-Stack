import React, { useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import img from "../../assets/empty.jpg";
import { FaEdit } from "react-icons/fa";

function EditCourses() {
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);
  const thumb = useRef(null);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* top bar */}
      <div className="flex flex-item justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative ">
        <IoMdArrowRoundBack
          className="top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate("/courses")}
        />
        <h2 className="text-2xl font-semibold md:pl-[60px]">
          Add Detail Information Regarding the Course
        </h2>

        <div className="space-x-2 space-y-2">
          <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
            Go to Lacture Page
          </button>
        </div>
      </div>

      {/* form details */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>
        <div className=" space-x-2 space-y-2">
          {!isPublished ? (
            <button
              className="bg-green-100 text-green-600 px-4 py-2 rounded-md border-1"
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to Publish
            </button>
          ) : (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md border-1"
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to UnPublish
            </button>
          )}
          <button className="bg-red-600 text-white px-4 py-2 rounded-md border-1">
            Remove Course
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm fornt-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="CourseTitle"
            />
          </div>

          {/* subtitle */}
          <div>
            <label
              htmlFor="subtitle"
              className="block text-sm fornt-medium text-gray-700 mb-1"
            >
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="CourseSubtitle"
            />
          </div>
          {/* description */}
          <div>
            <label
              htmlFor="dis"
              className="block text-sm fornt-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              type="text"
              id="dis"
              className="w-full border px-4 py-2 rounded-md h-24 resize-none"
              placeholder="CourseDescription"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {/* for Category */}
            <div className="flex-1">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1 "
              >
                {" "}
                Course Category{" "}
              </label>
              <select
                name=""
                id=""
                className="w-full border px-4 py-2 rounded-md"
              >
                <option value="">Select Category</option>
                <option value="App Developement">App Developement</option>
                <option value="Web Developement">Web Developement</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI/UX Designing">UI/UX Designing</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* for Level */}

            <div className="flex-1">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1 "
              >
                {" "}
                Course Level{" "}
              </label>
              <select
                name=""
                id=""
                className="w-full border px-4 py-2 rounded-md"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* for Price */}
            <div className="flex-1">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1 "
              >
                {" "}
                Course Price (INR){" "}
              </label>
              <input
                type="number"
                id="price"
                className="w-full border px-4 py-2 rounded-md"
                placeholder="₹"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Thumbnail
            </label>
            <input type="file" hidden ref={thumb} accept="image/*" />
          </div>

          <div className="relative w-[300px] h-[170px]">
            <img
              src={img}
              alt=""
              onClick={() => thumb.current.click()}
              className="w-[100%] h-[100%] border-1 border-black 
              rounded-[5px]"
            />
            <FaEdit
              className="w-[20px] h-[20px] absolute top-2 right-2"
              onClick={() => thumb.current.click()}
            />
          </div>

          <div className="flex item-center justify-start gap-[15px]">
            <button
              className="bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-4 py-2 rounded-md"
              onClick={() => navigate("/courses")}
            >
              cancel
            </button>
            <button className="bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer ">
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourses;
