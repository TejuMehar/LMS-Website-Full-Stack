import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  // 📊 Course progress data (lectures count)
  const CourseProgressData = creatorCourseData?.map((course) => ({
    name: course.title?.slice(0, 10) + "...",
    lectures: course.lectures?.length || 0,
  })) || [{ name: "No Courses", lectures: 0 }];

  // 👨‍🎓 Enrolled students data
  const EnrollData = creatorCourseData?.map((course) => ({
    name: course.title?.slice(0, 10) + "...",
    enrolled: course.enrolledStudents?.length || 0,
  })) || [{ name: "No Courses", enrolled: 0 }];

  // Total Earning
  const TotalEarning =
    creatorCourseData?.reduce((sum, course) => {
      const studentCount = course.enrolledStudents?.length || 0;
      const courseRevanue = course.price ? course.price * studentCount : 0;

      return sum + courseRevanue;
    }, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative w-full px-6 py-10 bg-gray-50 space-y-10">
        {/* Back Button */}
        <IoMdArrowRoundBack
          className="absolute top-6 left-6 w-6 h-6 text-gray-700 cursor-pointer hover:text-black"
          onClick={() => navigate("/")}
        />

        {/* Profile Section */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src={userData?.photoUrl || "/avatar.png"}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-black shadow-md"
          />

          <div className="text-center md:text-left space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome {userData?.name || "Educator"} 👋
            </h1>

            <h2 className="text-lg font-semibold text-gray-800">
              Total Earnings: ₹{TotalEarning.toLocaleString()}
            </h2>

            <p className="text-gray-600 text-sm">
              {userData?.description || "Start creating courses to earn"}
            </p>

            <button
              className="mt-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
              onClick={() => navigate("/courses")}
            >
              Create Courses
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 📊 Course Progress Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Course Progress (Lectures)
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CourseProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lectures" fill="#000000" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 👨‍🎓 Enrolled Students Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Enrolled Students
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={EnrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" fill="#000000" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
