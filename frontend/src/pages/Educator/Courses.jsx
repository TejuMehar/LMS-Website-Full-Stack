import React, { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import empty from "../../assets/empty.jpg";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../App";
import axios from "axios"
import { setCreatorCourseData} from "../../redux/courseSlice.js"

function Courses() {
  const navigate = useNavigate();
   const dispatch = useDispatch();
   const { userData} = useSelector(state=>state.user);
  const { creatorCourseData } = useSelector((state) => state.course);
 useEffect(() => {
  const creatorCourses = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/course/getCreatorCourses", {
        withCredentials: true
      });
      console.log(result.data);
      dispatch(setCreatorCourseData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  creatorCourses();
}, [userData]); 

  return (
    <div className="flex min-h-screen bg-gray-100 ">
      <div className="w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100 ">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 ">
          <div className="flex flex-items justify-center gap-3 ">
            <IoMdArrowRoundBack
              className="w-[22px] h-[22px] cursor-pointer "
              onClick={() => navigate("/dashboard")}
            />
            <h1 className="text-2xl font-semibold">All Created Courses</h1>
          </div>
          <button
            className="bg-[black] text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => navigate("/createcourse")}
          >
            Create Course
          </button>
        </div>

        {/* for large Screen Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-lg p-4 overflow-x-auto ">
          <table className="min-w-full text-sm ">
            <thead className='border-b bg-gray-50 className="text-left py-3 px-4"'>
              <tr>
                <th className="text-left py-3 px-4">Courses</th>
                <th className="text-left py-3 px-4">Prices</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {creatorCourseData?.map((course, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-[3px] px-[4px] flex flex-center gap-4 ">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        className="w-25 h-14 object-cover rounded-md object-fit "
                      />
                    ) : (
                      <img
                        src={empty}
                        className="w-25 h-14 object-cover rounded-md object-fit "
                      />
                    )}
                    <span className="mt-3">{course.title}</span>
                  </td>
                  {course?.price ? (
                    <td className="px-4 py-3">₹ {course.price || "NA"}</td>
                  ) : (
                    <td className="px-4 py-3">₹ {course.price || "NA"}</td>
                  )}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        course.isPublished
                          ? "bg-green-100 text-green"
                          : "bg-red-100 text-red-600"
                      } `}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <FaEdit className="text-gray-600 hover:text-blue-600 cursor-pointer w-10 h-5" onClick={()=>navigate(`/editcourse/${course?._id}`)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center text-sm text-gray-400 mt-6">
            A List of Your recent Courses...
          </p>
        </div>

        {/* for Scrren Screen Table */}
        {/* for Small Screen Table */}
        <div className="md:hidden space-y-4">
          {creatorCourseData?.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={course.thumbnail || empty}
                  className="w-15 h-15 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-medium text-sm">{course.title}</h2>
                  <p className="text-gray-600 text-xs mt-1">
                    ₹ {course.price || "NA"}
                  </p>
                </div>
                <FaEdit className="text-gray-600 hover:text-blue-600 cursor-pointer w-10 h-5" />
              </div>
              <span
                className={`w-fit px-3 py-1 text-xs rounded-full ${
                  course.isPublished
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {course.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          ))}
          <p className="text-center text-sm text-gray-400 mt-4">
            A List of Your recent Courses...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Courses;
