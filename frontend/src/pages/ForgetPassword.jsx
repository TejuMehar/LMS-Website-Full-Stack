import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl} from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1 - Send OTP
  const SendOpt = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/sendotp",
        { email },
        { withCredentials: true }
      );
      console.log(result.data);
      setStep(2);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 - Verify OTP
  const VerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/verifyotp",
        { email, otp },
        { withCredentials: true }
      );
      console.log(result.data);
      setStep(3);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3 - Reset Password
  const ResetPassword = async () => {
    if (newpassword !== conPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/resetpassword",
        { email, password: newpassword },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success(result.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Step 1 - Email */}
      {step === 1 && (
        <div className="mt-7 bg-white rounded-xl shadow-lg border-1 border-[#4b4b4b] w-full max-w-md">
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
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 text-gray-800"
                    >
                      Email address
                    </label>
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
                  <button
                    type="button"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 
                    rounded-md border border-transparent font-semibold bg-black text-white hover:bg-[#4b4b4b] 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
                    onClick={SendOpt}
                    disabled={loading}
                  >
                    {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
                  </button>
                </div>
              </form>
              <div
                className="text-sm text-center mt-4 text-bold hover:text-[#4b4b4b]"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 - OTP */}
      {step === 2 && (
        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md overflow-hidden transform transition-transform duration-200 hover:scale-100">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Verify OTP</h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter the code sent to <b>{email}</b>
            </p>
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-48 text-center text-2xl border-2 border-black rounded-xl mb-4 py-2"
            />
            <button
              type="button"
              onClick={VerifyOtp}
              disabled={loading}
              className="w-full py-4 bg-black text-white rounded-xl hover:bg-[#4b4b4b]"
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Verify OTP"}
            </button>
          </div>
        </div>
      )}

      {/* Step 3 - Reset Password */}
      {step === 3 && (
        <div className="mt-7 bg-white rounded-xl shadow-lg border-1 border-[#4b4b4b] w-full max-w-md">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                Reset Password
              </h1>
            </div>

            <div className="mt-5">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-bold ml-1 mb-2 text-gray-800"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={newpassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      placeholder="**********"
                      required
                    />

                    <label
                      htmlFor="cnPassword"
                      className="block text-sm font-bold ml-1 mb-2 text-gray-800 mt-4"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="cnPassword"
                      value={conPassword}
                      onChange={(e) => setConPassword(e.target.value)}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      placeholder="***********"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={ResetPassword}
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 
                    rounded-md border border-transparent font-semibold bg-black text-white hover:bg-[#4b4b4b] 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                  >
                    {loading ? <ClipLoader size={30} color="white" /> : "Reset"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
