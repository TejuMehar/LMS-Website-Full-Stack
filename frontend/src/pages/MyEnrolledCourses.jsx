import React from 'react'
import { useSelector } from 'react-redux'

function MyEnrolledCourses() {
  const {userData} = useSelector((state)=>state.user);
  return (
    <div>
      
    </div>
  )
}

export default MyEnrolledCourses
