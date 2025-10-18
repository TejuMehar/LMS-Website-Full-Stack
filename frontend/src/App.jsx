import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import {ToastContainer} from "react-toastify"
import { getCurrentUser } from '../../backend/controllers/userController';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import EditProfile from './pages/EditProfile';
import Dashboard from './pages/Educator/Dashboard';
import Courses from './pages/Educator/Courses';
import EditCourses from './pages/Educator/EditCourses';
import CreateCourses from './pages/Educator/CreateCourses';
import getCreatorCourse from './CustomHooks/getCreatorCourse';
export const serverUrl = "http://localhost:8000"

function App() {
  getCurrentUser()
  getCreatorCourse()

  const { userData } = useSelector(state=>state.user);
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={userData ? <Profile /> : <Navigate to={"/signup"}/>} />
        <Route path="/forget" element={<ForgetPassword/>}/>
        <Route path="/editprofile" element={<EditProfile/>}/>
        <Route path="/dashboard" element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"}/>} />
        <Route path="/courses" element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/signup"}/>} />
        <Route path="/createcourse" element={userData?.role === "educator" ? <CreateCourses /> : <Navigate to={"/signup"}/>} />
        <Route path="/editcourse/:id" element={userData?.role === "educator" ? <EditCourses /> : <Navigate to={"/signup"}/>} />
      </Routes>
    </>
  );
}

export default App;
