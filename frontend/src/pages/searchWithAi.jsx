import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import ai from "../assets/ai.png";
import { BsMic } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../App";
import empty from "../assets/empty.jpg";
import startSound from "../assets/start.mp3";

function SearchWithAi() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [recommandation, setRecommandation] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message, { lang: "en-IN" });
    window.speechSynthesis.speak(utterence);
  }

  const handleSearch = async () => {
    // Play start sound
    const audio = new Audio(startSound);
    audio.play().catch((e) => console.log("Audio play failed:", e));

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    setIsListening(true);
    recognition.start();

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      await handleRecomandation(transcript);
    };

    recognition.onerror = () => {
      toast.error("Speech recognition error");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const handleRecomandation = async (query = input) => {
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/course/search",
        { input: query },
        { withCredentials: true },
      );
      console.log("Search result:", result.data);
      setRecommandation(result.data.courses || []);
      if(result.data.courses.length > 0){
           speak("These are the top Courses i Found for You");
      }else{
        speak("No courses Found");
      }
   
    } catch (err) {
      console.error("Search error:", err);
      toast.error("Search failed");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-10 text-center mb-8">
          {/* Back Button */}
          <IoMdArrowRoundBack
            className="absolute top-5 left-5 text-white w-6 h-6 cursor-pointer hover:scale-110 transition"
            onClick={() => navigate("/")}
          />

          {/* Heading */}
          <h1 className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold mb-8 text-white">
            Search With
            <img src={ai} alt="AI" className="w-8 h-8" />
            <span className="text-[#CB99C7]">AI</span>
          </h1>

          {/* Listening Animation */}
          {isListening && (
            <div className="flex justify-center items-center gap-1 mb-4">
              <div
                className="w-1 bg-red-500 rounded-full animate-pulse"
                style={{ height: "20px", animationDelay: "0ms" }}
              ></div>
              <div
                className="w-1 bg-red-500 rounded-full animate-pulse"
                style={{ height: "30px", animationDelay: "100ms" }}
              ></div>
              <div
                className="w-1 bg-red-500 rounded-full animate-pulse"
                style={{ height: "25px", animationDelay: "200ms" }}
              ></div>
              <div
                className="w-1 bg-red-500 rounded-full animate-pulse"
                style={{ height: "35px", animationDelay: "300ms" }}
              ></div>
              <div
                className="w-1 bg-red-500 rounded-full animate-pulse"
                style={{ height: "20px", animationDelay: "400ms" }}
              ></div>
              <p className="text-white ml-3">Listening...</p>
            </div>
          )}

          {/* Search Box */}
          <div className="flex items-center gap-3 bg-black/40 border border-white/20 rounded-full px-4 py-3">
            <input
              type="text"
              placeholder="What do you want to learn? (AI, MERN, Cloud...)"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-sm sm:text-base"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleRecomandation()}
            />

            {/* Search Button */}
            <button
              className="bg-[#CB99C7] p-2 rounded-full hover:scale-110 transition"
              onClick={() => handleRecomandation()}
              disabled={isSearching}
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FaSearch className="text-white w-4 h-4" />
              )}
            </button>

            {/* Mic Button */}
            <button
              className={`p-2 rounded-full transition ${
                isListening
                  ? "bg-red-500 animate-pulse"
                  : "bg-white/20 hover:bg-white/30"
              }`}
              onClick={handleSearch}
              disabled={isListening}
            >
              <BsMic className="text-white w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm mt-4">
            Try voice search or type your learning topic 🚀
          </p>
        </div>

        {/* Search Results */}
        {recommandation.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">
              Found {recommandation.length} courses for you:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommandation.map((course) => (
                <div
                  key={course._id}
                  className="bg-white/20 rounded-xl p-4 hover:bg-white/30 transition cursor-pointer"
                  onClick={() => navigate(`/viewcourse/${course._id}`)}
                >
                  <img
                    src={course.thumbnail || empty}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {course.subTitle}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#CB99C7] font-bold">
                      ₹{course.price}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {course.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchWithAi;

