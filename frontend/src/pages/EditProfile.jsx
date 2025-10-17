import React from "react";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [name,setName] = useState(userData.name || "");
  const [description,setDescription] = useState(userData.description || "");
  const [photoUrl,setPhotoUrl] = useState(null);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();

  const formData = new FormData();
  formData.append("name",name)
  formData.append("description",description)
  formData.append("photoUrl",photoUrl)


  const handleEdit = async()=>{
    setLoading(true);
    try{
     const result = await axios.post(serverUrl+"/api/user/updateprofile",formData,{withCredentials:true})
     dispatch(setUserData(result.data));
     setLoading(false);   
     navigate("/");
     toast.success("Profile Updated");     
    }catch(error){
        setLoading(false);
        toast.error(error.response.data.message);

    }

  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full relative transition-transform duration-200 hover:scale-[1.02]">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Your Profile
        </h2>

        {/* Back Button */}
        <IoMdArrowRoundBack
          className="absolute top-[6%] left-[5%] w-[24px] h-[24px] text-gray-700 cursor-pointer hover:text-black transition"
          onClick={() => navigate("/profile")}
        />

        {/* Form */}
        <form className="space-y-5" onSubmit={(e)=>e.preventDefault()}>
          <div className="flex flex-col items-center text-center">
            {/* Avatar Section */}
            <div className="relative mb-4">
              {userData?.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  className="w-28 h-28 rounded-full object-cover border-4 border-black shadow-md"
                />
              ) : (
                <div className="w-28 h-28 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white shadow-md">
                  {userData?.name?.slice(0, 1).toUpperCase()}
                </div>
              )}
              <p className="mt-3 text-lg font-semibold text-gray-800">
                {userData?.name || "Your Name"}
              </p>
            </div>

            {/* Change Avatar */}
            <div className="w-full mb-2">
              <label
                htmlFor="image"
                className="text-sm font-medium text-gray-700  text-left block"
              >
                Change Avatar
              </label>
              <input
                type="file"
                id="image"
                name="photoUrl"
                accept="image/*"
                onChange={(e)=>setPhotoUrl(e.target.files[0])}
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm cursor-pointer bg-gray-50 focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Name Input */}
            <div className="w-full mb-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700  text-left block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e)=>setName(e.target.value)}
                value={name}
                placeholder={userData?.name || "Enter your name"}
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Email Input */}
            <div className="w-full mb-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700  text-left block"
              >
                Email
              </label>
              <input
                readOnly
                type="text"
                id="email"
                placeholder={userData?.email || "Enter your email"}
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm bg-gray-50 focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Bio */}
            <div className="w-full mb-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700  text-left block"
              >
                Bio
              </label>
              <textarea
                id="description"
                name="description"
                onChange={(e)=>setDescription(e.target.value)} value={description}
                placeholder="Tell us about yourself..."
                rows={3}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md text-sm resize-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            onClick={handleEdit}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
