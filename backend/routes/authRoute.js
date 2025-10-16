import express from "express"
import {signUp,login,logOut, sendOtp, verifyOtp, resetPassword} from "../controllers/authController.js"
const router = express.Router();


router.post("/signup",signUp);
router.post("/login",login);
router.get("/logout",logOut);
router.post("/sendotp",sendOtp);
router.post('/verifyotp',verifyOtp);
router.post("/resetpassword",resetPassword);


export default router;