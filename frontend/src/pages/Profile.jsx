import React from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { IoMdArrowRoundBack } from "react-icons/io";


const Profile = () => {
  const { userData } = useSelector(state=>state.user);
  const navigate =useNavigate();

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative'>
         <IoMdArrowRoundBack className='absolute top-[8%] left-[5%] w-[22px] h-[22px] courser-pointer' onClick={()=>navigate("/")}/>
        <div className='flex flex-col items-center text-center'>
          {userData?.photoUrl ? (
            <img 
              src={userData.photoUrl} 
              className='w-24 h-24 rounded-full object-cover border-4 border-black' 
            />
          ) : 
            <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white'>
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          }

          <h2 className='text-2xl font-bold mt-4 text-gray-800  '>{userData.name}</h2>
            <p className='text-sm text-gray-500 '>{userData.role}</p>
        </div>

         <div className='mt-6 space-y-4'>
           <div className='text-sm flex items-center justify-start gap-3'>
                 <span className='text-sm'>Email:</span>
                 <span className='font-semibold text-gray-700'>{userData.email}</span>
           </div>
           <div className='text-sm flex items-center justify-start gap-3'>
                 <span className='text-sm'>Bio:</span>
                 <span className='font-semibold text-gray-700'>{userData.description}</span>
           </div>
           <div className='text-sm flex items-center justify-start gap-3'>
                 <span  className='text-sm'>Enrolled Courses:</span>
                 <span className='font-semibold text-gray-700'>{userData.enrollCourses.length}</span>
           </div>
          
         </div>
      
         <div className='mt-6  flex justify-center gap-4 '>
          <button className='px-2 py-2 rounded bg-[black] text-white active:bg-[#4b4b4b] 
          cousor-pointer transition' onClick={()=>navigate("/editprofile")}>Edit Profile</button>
         </div>

      </div>
    </div>
  )
}

export default Profile;
