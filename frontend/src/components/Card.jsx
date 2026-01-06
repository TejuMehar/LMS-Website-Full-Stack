import React from "react";
import { FaStar } from "react-icons/fa6";
import empty from "../assets/empty.jpg";
import { useNavigate } from "react-router-dom";

function Card({ thumbnail, title, subTitle, category, price, level, id }) {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-300 cursor-pointer"
      onClick={() => navigate(`/viewcourse/${id}`)}
    >
      <img
        src={thumbnail || empty}
        alt={title || "Course"}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = empty;
        }}
      />

      <div className="p-5 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {title}
        </h2>
        {subTitle && (
          <p className="text-sm text-gray-600 line-clamp-2">{subTitle}</p>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 capitalize text-xs">
            {category}
          </span>
          {level && (
            <span className="px-2 py-0.5 bg-blue-100 rounded-full text-blue-700 capitalize text-xs">
              {level}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600 mt-3">
          <span className="font-semibold text-gray-800 text-lg">
            {price ? `₹ ${price}` : "Free"}
          </span>
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <span>5.0</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
