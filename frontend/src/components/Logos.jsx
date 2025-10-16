import React from 'react'
import { MdOutlineCastForEducation } from "react-icons/md";
import { MdSwitchAccessShortcut } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { SlSupport } from "react-icons/sl";
import { RiUserCommunityLine } from "react-icons/ri";


const Logos = () => {
  return (
    <div className='w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px]'>
      <div className='flex text-center justify-center gap-2  px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
        <MdOutlineCastForEducation className='w-[35px] h-[35px] fill-[#03394b]'/>
        20k+ Online Courses
        </div>

        <div className='flex text-center justify-center gap-2  px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
        <MdSwitchAccessShortcut className='w-[35px] h-[35px] fill-[#03394b]'/>
        Lifetime Access
        </div>
        
        <div className='flex text-center justify-center gap-2  px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
        < GiReceiveMoney className='w-[35px] h-[35px] fill-[#03394b]'/>
        Value for Money
        </div>

        <div className='flex text-center justify-center gap-2  px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
        <SlSupport className='w-[35px] h-[35px] fill-[#03394b]'/>
        Lifetime Support
        </div>

        <div className='flex text-center justify-center gap-2  px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
        < RiUserCommunityLine className='w-[35px] h-[35px] fill-[#03394b]'/>
        Comminity Support
        </div>
    </div>
  )
}

export default Logos
