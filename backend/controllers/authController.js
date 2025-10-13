import User from "../model/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import genToken from "../config/token.js"

export const signUp = async(req,res)=>{
   try{
      const { name, email, password, role} = req.body;
      let existUser = await User.findOne({email});

      if(existUser){
        res.status(400).json({message: "User Already Exist!"});
      }

      if(!validator.isEmail(email)){
        return res.status(400).json({message: "Enter Valid Email!"})
      }
      if(password.length < 8){
        return res.status(400).json({message: "Enter Strong Password!"})
      }

      let hashPassword = await bcrypt.hash(password,10);
      const user = await User.create({
        name,
        email,
        hashPassword,
        role
      });
     
      let token = await genToken(user._id);
      req.cookie("token",token,
           {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
           }
      )
     return res.status(201).json(user);
   }catch(error){
    return res.status(500).json({message:`SignUp error ${error}`})
   }
}