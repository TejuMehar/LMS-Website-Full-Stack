import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [step, setStep] = useState(3);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Step 2 logic: send email request to backend
    setStep(2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Step 1 */}
      {step === 1 && (
        <div className="mt-7 bg-white rounded-xl shadow-lg border-1 border-[#4b4b4b] shadow-black shadow-lg w-full max-w-md">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Remember your password?{" "}
                <a
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  href="/login"
                >
                  Login here
                </a>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 text-gray-800"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 
                    rounded-md border border-transparent font-semibold bg-black text-white hover:bg-[#4b4b4b] 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                  >Send Otp</button>
                </div>
              </form>
                <div className="text-sm text-center mt-4 text-bold hover:text-[#4b4b4b]" onClick={()=>navigate("/login")}>Back to Login </div>
            </div>
          </div>
        </div>
      )}


{/* Step 2 - OTP Verification */}
{step == 2 && (
  <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md overflow-hidden grid md:grid-cols-1 transform transition-transform duration-200 hover:scale-100">
    <div className="p-8 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 300"
        className="mx-auto mb-6 w-48 h-48 animate-pulse"
      >
        <circle cx="200" cy="200" r="150" fill="#000000" />
        <circle cx="200" cy="200" r="120" fill="#FFFFFF" />
        <circle cx="200" cy="200" r="90" fill="#000000" />
        <circle cx="200" cy="200" r="60" fill="#FFFFFF" />
        <text
          x="200"
          y="200"
          textAnchor="middle"
          fill="#000000"
          fontSize="40"
          fontWeight="bold"
          dy=".3em"
        >
          OTP
        </text>
      </svg>

      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
        Verify OTP
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-600 mb-6">
        Enter the 4-digit code sent to <b>{email}</b>
      </p>

      {/* OTP Inputs with auto-focus logic */}
      <div className="flex justify-center space-x-4 mb-6">
        {Array(4)
          .fill("")
          .map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              className="w-12 h-16 text-center text-2xl border-2 border-black rounded-xl
              focus:outline-none focus:ring-2 focus:ring-black
              dark:text-black dark:border-[#4b4b4b]
              transition-transform duration-300 hover:scale-110"
              onChange={(e) => {
                const value = e.target.value;
                if (value && i < 5) {
                  e.target.nextSibling.focus(); // go to next input
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !e.target.value && i > 0) {
                  e.target.previousSibling.focus(); // go to previous input
                }
              }}
            />
          ))}
      </div>

      <div className="text-md text-gray-600 dark:text-gray-400 mb-6">
        Didn’t receive code?{" "}
        <button
          className="text-blue-500 hover:underline dark:text-blue-400 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-500"
          onClick={() => alert("OTP Resent!")}
        >
          Resend OTP
        </button>
      </div>

      <button
        onClick={() => setStep(3)}
        className="w-full py-4 bg-black text-white rounded-xl hover:bg-[#4b4b4b]
        transition-transform duration-300"
      >
        Verify OTP
      </button>
    </div>
  </div>
)}

      {/* Step 3 */}
        {step == 3 && (
        <div className="mt-7 bg-white rounded-xl shadow-lg border-1 border-[#4b4b4b] shadow-black shadow-lg w-full max-w-md">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Remember your password?{" "}
                <a
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  href="/login"
                >
                  Login here
                </a>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <div>

                    <label
                      htmlFor="password"
                      className="block text-sm font-bold ml-1 mb-2 text-gray-800"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="password"
                        name="password"
                        // value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        placeholder="**********"
                        required
                      />
                    </div>

                     <label
                      htmlFor="cnPassword"
                      className="block text-sm font-bold ml-1 mb-2 text-gray-800"
                    >
                      Conform Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="cnPassword"
                        name="cnPassword"
                        // value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        placeholder="***********"
                        required
                      />
                    </div>
                    
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 
                    rounded-md border border-transparent font-semibold bg-black text-white hover:bg-[#4b4b4b] 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                  >Reset</button>
                </div>
              </form>
                <div className="text-sm text-center mt-4 text-bold hover:text-[#4b4b4b]" onClick={()=>navigate("/login")}>Back to Login </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ForgetPassword;
