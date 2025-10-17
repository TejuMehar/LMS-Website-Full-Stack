import {v2 as cloudinary } from "cloudinary"
import fs from "fs"



const uploadOnCloudinary = async(filePath) =>{
     cloudinary.config({
     cloud_name: process.env.CLOUDINARY_NAME,
     api_key:process.env.CLOUDINARY_API_KEY,
     api_secret:process.env.CLOUDINARY_SECRET
     })

     try{
        if(!filePath){
            return null;
        }
        if(!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET){
            console.warn("Cloudinary env variables are not set. Skipping upload.");
            // optionally remove local file if present
            if (fs.existsSync(filePath)) {
              try { fs.unlinkSync(filePath); } catch(e){ /* ignore */ }
            }
            return null;
        }

        const uploadResult = await cloudinary.uploader.upload(filePath,{resource_type: "auto"});
        if (fs.existsSync(filePath)) {
          try { fs.unlinkSync(filePath); } catch(e){ /* ignore */ }
        }

        return uploadResult.secure_url

    }catch(error){
      if (filePath && fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch(e){ /* ignore */ }
      }
      console.log(error);
      return null;
    }
}


export default uploadOnCloudinary;