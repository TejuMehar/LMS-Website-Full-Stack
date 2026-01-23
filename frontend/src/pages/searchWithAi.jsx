import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import ai from "../assets/ai.png";
import { BsMic } from "react-icons/bs";
import { toast } from "react-toastify";

function SearchWithAi() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [recommandation, setRecommandation] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const handleSearch = async () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error("Speech Recognition is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);
    recognition.start();

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      toast.error("Speech recognition error");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      {/* Card */}
      <div className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-10 text-center" onClick={(e) => e.stopPropagation()}>
        {/* Back Button */}
        <IoMdArrowRoundBack 
          className="absolute top-5 left-5 text-white w-6 h-6 cursor-pointer hover:scale-110 transition" 
          onClick={() => navigate("/")}
        />

        {/* Heading */}
        <h1 className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold mb-8">
          Search With
          <img src={ai} alt="AI" className="w-8 h-8" />
          <span className="text-[#CB99C7]">AI</span>
        </h1>

        {/* Search Box */}
        <div className="flex items-center gap-3 bg-black/40 border border-white/20 rounded-full px-4 py-3">
          {/* Input */}
          <input
            type="text"
            placeholder="What do you want to learn? (AI, MERN, Cloud...)"
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-sm sm:text-base"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* AI Button */}
          <button className="bg-[#CB99C7] p-2 rounded-full hover:scale-110 transition">
            <img src={ai} alt="AI" className="w-5 h-5" />
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

        {/* Hint Text */}
        <p className="text-gray-400 text-xs sm:text-sm mt-4">
          Try voice search or type your learning topic 🚀
        </p>
      </div>
    </div>
  );
}

export default SearchWithAi;
