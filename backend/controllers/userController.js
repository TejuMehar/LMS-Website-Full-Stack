import User from "../model/userModel.js"

export const getCurrentUser = async(req,res)=>{
  try{
   const user = await User.findById(req.userId).select("-password");
   if(!user){
    return res.status(404).json({message: "User not found"})
   }
   return res.status(200).json(user)
  }catch(error){
    return res.status(500).json({message: `Get current Error ${error}`})
  }
}

export const updateProfile = async (req, res) => {
  console.log("Uploaded file:", req.file);
  try {
    const userId = req.userId;
    const { description, name } = req.body;
    let photoUrl;

       if (req.file) {
      const filePath = `./public/${req.file.filename}`;  // Construct correct file path
      const { default: uploadOnCloudinary } = await import("../config/cloudinary.js");
      photoUrl = await uploadOnCloudinary(filePath);
    }

    const updateData = { name, description };
    if (photoUrl) updateData.photoUrl = photoUrl; // only include if uploaded

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true } // return updated document
    );

    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message: `Update User Error ${error}` });
  }
};
