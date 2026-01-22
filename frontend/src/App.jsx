import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import EditProfile from "./pages/EditProfile";
import Dashboard from "./pages/Educator/Dashboard";
import Courses from "./pages/Educator/Courses";
import EditCourses from "./pages/Educator/EditCourses";
import CreateCourses from "./pages/Educator/CreateCourses";
import AllCourses from "./pages/AllCourses";
import useGetCurrentUser from "./CustomHooks/getCurrentUser";
import useGetCreatorCourse from "./CustomHooks/getCreatorCourse";
import useGetPublishedCourse from "./CustomHooks/getPublishedCourse";
import CreateLecture from "./pages/Educator/CreateLecture";
import EditlLecture from "./pages/Educator/EditlLecture";
import MyEnrolledCourses from "./pages/MyEnrolledCourses";
import ViewCourse from "./pages/ViewCourse";
import ViewLecture from "./pages/ViewLecture";
import ScrollToTop from "./components/ScrollToTop";
export const serverUrl = "http://localhost:8000";

function App() {
  useGetCurrentUser();
  useGetCreatorCourse();
  useGetPublishedCourse();

  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to={"/signup"} />}
        />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route
          path="/allcourses"
          element={userData ? <AllCourses /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/dashboard"
          element={
            userData?.role === "educator" ? (
              <Dashboard />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/courses"
          element={
            userData?.role === "educator" ? (
              <Courses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/createcourse"
          element={
            userData?.role === "educator" ? (
              <CreateCourses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/editcourse/:courseId"
          element={
            userData?.role === "educator" ? (
              <EditCourses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/createlecture/:courseId"
          element={
            userData?.role === "educator" ? (
              <CreateLecture />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/editlecture/:courseId/:lectureId"
          element={
            userData?.role === "educator" ? (
              <EditlLecture />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route path="/viewcourse/:courseId" element={<ViewCourse />} />
        <Route
          path="/viewlecture/:courseId"
          element={userData ? <ViewLecture /> : <Navigate to="/login" />}
        />
        <Route
          path="/mycourses"
          element={userData ? <MyEnrolledCourses /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
