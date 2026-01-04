import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ai from "../assets/SearchAi.png";
import { useSelector } from "react-redux";
import Card from "../components/Card";

function AllCourses() {
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  const [category, setCategory] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((c) => c !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilters = () => {
    let courseCopy = courseData?.slice();
    if (category.length > 0) {
      courseCopy = courseCopy.filter((course) =>
        category.includes(course.category)
      );
    }
    setFilteredCourses(courseCopy);
  };

  useEffect(() => {
    setFilteredCourses(courseData);
  }, [courseData]);

  useEffect(() => {
    applyFilters();
  }, [category]);

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      <Navbar />

      <button className="fixed top-20 left-2 z-40 bg-white text-black px-3 py-1 rounded-lg md:hidden border-2  border-black" onClick={()=>setIsSidebarVisible(prev=> !prev)}>
        {isSidebarVisible ? "Hide Filters" : "Show Filters"} 
      </button>

      {/* sidebar */}
      <aside className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5 ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full' } md:block md:translate-x-0`}>
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
              onChange={toggleCategory}
              value={"App Development"}
            />{" "}
            App Development
          </label>

          {/* AI/ML */}
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition "
          >
            <input
              type="checkbox"
              className="accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"AI/ML"}
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
              onChange={toggleCategory}
              value={"AI Tools"}
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
              onChange={toggleCategory}
              value={"Data Science"}
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
              onChange={toggleCategory}
              value={"Data Analytics"}
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
              onChange={toggleCategory}
              value={"Ethical Hacking"}
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
              onChange={toggleCategory}
              value={"UI/UX Designing"}
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
              onChange={toggleCategory}
              value={"Web Developement"}
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
              onChange={toggleCategory}
              value={"Other"}
            />{" "}
            Other
          </label>
        </form>
      </aside>

      <main className="w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]">
        {filteredCourses?.map((course, index) => (
          <Card
            thumbnail={course.thumbnail}
            title={course.title}
            subTitle={course.subTitle}
            category={course.category}
            price={course.price}
            level={course.level}
            id={course._id}
          />
        ))}
      </main>
    </div>
  );
}

export default AllCourses;
