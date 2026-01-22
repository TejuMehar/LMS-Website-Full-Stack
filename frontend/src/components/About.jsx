import React from "react";
import { FaGraduationCap, FaUsers, FaAward, FaRocket } from "react-icons/fa";
import about from "../assets/about.jpg";

function About() {
  return (
    <div className="w-full py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            About Our Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
            Empowering learners worldwide with cutting-edge education and innovative learning experiences
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
            <img
              src={about}
              alt="About Us"
              className="relative w-full h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800 animate-slide-right">
              Transforming Education for the Digital Age
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed animate-slide-right">
              We believe in making quality education accessible to everyone, everywhere. Our platform connects passionate educators with eager learners, creating a vibrant community of knowledge sharing.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed animate-slide-right">
              With cutting-edge technology and innovative teaching methods, we're revolutionizing how people learn and grow in their careers.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium animate-bounce-in">
                Interactive Learning
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium animate-bounce-in">
                Expert Instructors
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium animate-bounce-in">
                Lifetime Access
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group hover:scale-110 transition-transform duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <FaGraduationCap className="text-blue-600 text-2xl" />
            </div>
            <h4 className="text-3xl font-bold text-gray-800 mb-2">1000+</h4>
            <p className="text-gray-600">Courses Available</p>
          </div>
          
          <div className="text-center group hover:scale-110 transition-transform duration-300">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <FaUsers className="text-green-600 text-2xl" />
            </div>
            <h4 className="text-3xl font-bold text-gray-800 mb-2">50K+</h4>
            <p className="text-gray-600">Active Students</p>
          </div>
          
          <div className="text-center group hover:scale-110 transition-transform duration-300">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <FaAward className="text-purple-600 text-2xl" />
            </div>
            <h4 className="text-3xl font-bold text-gray-800 mb-2">500+</h4>
            <p className="text-gray-600">Expert Instructors</p>
          </div>
          
          <div className="text-center group hover:scale-110 transition-transform duration-300">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
              <FaRocket className="text-orange-600 text-2xl" />
            </div>
            <h4 className="text-3xl font-bold text-gray-800 mb-2">95%</h4>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
