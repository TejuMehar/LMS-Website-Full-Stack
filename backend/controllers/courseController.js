import Course from "../model/courseModel";



export const createCourse = async(req,res)=>{
  try{
     const {title,category} =req.body;

     if(!title || !category){
        return res.status(400).json({message: "Title and Category Is Required"})
     }

     const course = await Course.create({
        title,
        description,
        creator:req.userId
     })

     return res.status(200).json(course);
  }catch(error){
    return res.status(500).json({message:`CreateCourse error ${error}`});
  }
}

export const getPublishedCourses = async(req,res)=>{
    try{
       const courses = await Course.find({isPublished:true});
       if(!courses){
        return res.status(400).json({message: "Courses is Not Found"})
       }
       return res.status(200).json(courses);
    }catch(error){
      return res.status(500).json({message: `failed to get isPublished Courses ${error}`});
    }
}


export const getCreatorCourses = async(req,res)=>{
    try{
       const userId = req.userId;
       
       const courses = await Course.find({creator:userId});

       if(!courses){
        return res.status(400).json({message: "Courses is Not Found"})
       }
       return res.status(200).json(courses);

    }catch(error){
         return res.status(500).json({message: `failed to get creator Courses ${error}`});
    }
}



export const editCourses = async(req,res)=>{
    try{
        const {courseId} = req.params;
        const {title,subTitle,description,category,level,isPublished,price} = req.body;
        let thumbnail
        
        if(req.file){
            thumbnail = await uploadOnCloudinary(req.file.path)
        }
        let course = await Course.findById(courseId);

        if(!course){
           return res.status(400).json({message: "Courses are Not Found"})  
        }
         
        const updateData = {title,subTitle,description,category,level,isPublished,price,thumbnail}

        course = await Course.findByIdAndUpdate(courseId,updateData,{new:true});
        return res.status(200).json(course);

    }catch(error){
        return res.status(500).json({message: `failed to get creator Courses ${error}`});
    }
}


export const getCourseById =  async(req,res)=>{
    try{
        const {courseId} = req.params;

        let course = await Course.findById(courseId);

        if(!course){
           return res.status(400).json({message: "Courses are Not Found"})  
        }
     return res.status(200).json(course);

    }catch(error){
       return res.status(500).json({message: `faild to get Course by id  ${error}`}); 
    }
}

export const removeCourse = async(req,res)=>{
    try{
         const {courseId} = req.params;
         let course = await Course.findById(courseId);

        if(!course){
           return res.status(400).json({message: "Courses are Not Found"})  
        }
        course = await Course.findByIdAndDelete(courseId,{new:true})
         return res.status(200).json({message:"Course Removed"})
    }catch(error){
          return res.status(500).json({message: `faild removeCourses  ${error}`}); 
    }
}