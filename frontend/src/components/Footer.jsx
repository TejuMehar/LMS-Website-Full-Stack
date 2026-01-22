import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              Virtual Learning
            </h3>
            <p className="text-gray-300">
              Empowering learners worldwide with quality education.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => navigate("/allcourses")}
                >
                  All Courses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Course Categories */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Data Science
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  AI & Machine Learning
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Digital Marketing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-300 mb-2">tejasmehar7@gmail.com</p>
            <p className="text-gray-300">+91 0000000000</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Virtual Learning. All rights reserved. Made with ❤️ for
            learners.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
