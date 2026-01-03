import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

function CardPage() {
  const { courseData } = useSelector((state) => state.course);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    if (courseData && courseData.length > 0) {
      setPopularCourses(courseData.slice(0, 6));
    } else {
      setPopularCourses([]);
    }
  }, [courseData]);

  return (
    <div className="relative flex items-center justify-center flex-col">
      <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]">
        Our Popular Courses
      </h1>
      <span className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] px-[20px]">
        Explore top-rated courses designed to boost your skills, enhance
        careers, and unlock opportunities in tech, AI, business and beyond
      </span>
      
      <div className="w-full min-h-[100vh] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]">
        {popularCourses && popularCourses.length > 0 ? (
          popularCourses.map((course) => (
            <Card
              key={course._id}
              thumbnail={course.thumbnail}
              title={course.title}
              subTitle={course.subTitle}
              category={course.category}
              price={course.price}
              level={course.level}
              id={course._id}
            />
          ))
        ) : (
          <div className="w-full text-center py-20">
            <p className="text-gray-500 text-lg">
              No courses available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardPage;
