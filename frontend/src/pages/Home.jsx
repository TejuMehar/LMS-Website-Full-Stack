import React from 'react'
import Navbar from '../components/Navbar'
import home from "../assets/home1.jpg"
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import Logos from '../components/Logos';
import ExploreCourses from '../components/ExploreCourses';

function Home() {
  return (
    <div className='w-[100%] overflow-hidden'>
      
      <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
        <Navbar/>
        <img src={home} alt="home" className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]'/>

        <span className='lg:text-[70px] absolute md:text-[40px] 
        lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]  '>Grow Yopur Skills to Advance</span>

        <span className='lg:text-[70px] absolute md:text-[40px] 
        lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]'> Your career path</span>
          
          <div className='absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%]
          flex items-center justify-center gap-3 flex-wrap'>
            <button className='px-[20px] py-[10px]  border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] 
            text-[18px] font-light flex gap-2 cursor-pointer '>View All Courses <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black'/></button>
            
            <button className='px-[20px] py-[10px] bg-white  border-2 lg:border-white border-black lg:text-black  text-black rounded-[10px] 
            text-[18px] font-light flex gap-2 cursor-pointer '>Search With Ai 
            <img src={ai} className='w-[30px] h-[30px]  rounded-full hidden lg:block' alt="" />
            <img src={ai1} className='w-[35px] h-[35px]  rounded-full lg:hidden lg:block' alt="" />
            </button>
          </div>
          
      </div>
         <Logos/>
         <ExploreCourses/>
    </div>
  )
}

export default Home
