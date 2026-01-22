import { createSlice } from "@reduxjs/toolkit"

const courseSlice = createSlice({
   name:"course",
   initialState: {
    creatorCourseData:null,
    courseData: null,
    selectedCourse:null,
    creatorData: null
   },
   reducers: {
   setCreatorCourseData: (state,action)=>{
    state.creatorCourseData = action.payload
    },
   setCourseData: (state,action)=>{
    state.courseData = action.payload
    },
   setSelectedCourse: (state,action)=>{
    state.selectedCourse = action.payload
    },
   setCreatorData: (state,action)=>{
    state.creatorData = action.payload
    },
   }
})

export const {setCreatorCourseData, setCourseData ,setSelectedCourse, setCreatorData} = courseSlice.actions
export default courseSlice.reducer