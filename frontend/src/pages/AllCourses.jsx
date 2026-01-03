import React from "react";
import Navbar from "../components/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ai from "../assets/SearchAi.png";
function AllCourses() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-gray-50 ">
      <Navbar />

      {/* sidebar */}
      <aside className="w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5">
        <h2 className="text-xl font-bold flex items-center justify-center gap-5 text-gray-50 mb-6">
          <IoMdArrowRoundBack
            className="text-white"
            onClick={() => navigate("/")}
          />{" "}
          Filter By Category
        </h2>
        <form
          action=""
          className="space-y-4 text-sm bg-gray-600 border-white text-[white] border p-[20px] rounded-2xl "
          onSubmit={(e) => e.preventDefault()}
        >
          <button className="px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer">
            Search with AI{" "}
            <img src={ai} alt="" className="w-[30px] h-[30px] rounded-full" />
          </button>

          {/* App Developement */}
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition "
          >
            <input
              type="checkbox"
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            App Developement
          </label>

          {/* AI/ML */}
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition "
          >
            <input
              type="checkbox"
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            AI/ML
          </label>

          {/* AI Tools */}
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition "
          >
            <input
              type="checkbox"
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            AI Tools
          </label>

          {/* Data Science */}
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition "
          >
            <input
              type="checkbox"
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            Data Science
          </label>

          {/* Data Analytics */}
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition "
          >
            <input
              type="checkbox"
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            Data Analytics
          </label>

          {/* Ethical Hacking */}
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition "
          >
            <input
              type="checkbox"
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            Ethical Hacking
          </label>

          {/* UI/UX Designing */}
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition "
          >
            <input
              type="checkbox"
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            UI/UX Designing
          </label>

          {/* Web Development */}
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition "
          >
            <input
              type="checkbox"
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            Web Development
          </label>

          {/* Other */}
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition "
          >
            <input
              type="checkbox"
              className="accent-black w-4 h-4 rounded-md"
            />{" "}
            Other
          </label>
        </form>
      </aside>
    </div>
  );
}

export default AllCourses;
