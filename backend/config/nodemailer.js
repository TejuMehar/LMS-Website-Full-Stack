import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,  
    pass: process.env.USER_PASS 
  }
});

const sendMail = async(to,otp)=>{
     await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: to,
      subject: "Reset your password" ,
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
        <div style="max-width: 500px; margin: 0 auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background-color: #007bff; color: white; text-align: center; padding: 20px 0;">
            <h2 style="margin: 0;">Password Reset Request</h2>
          </div>
          <div style="padding: 20px;">
            <p>Hello 👋,</p>
            <p>We received a request to reset your password. Please use the OTP below to proceed:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 4px;">${otp}</span>
            </div>
            
            <p>This OTP is valid for <b>10 minutes</b>. If you did not request this, please ignore this email.</p>
            <p>Thank you,<br><b>Your App Team</b></p>
          </div>
          <div style="background-color: #f4f6f8; text-align: center; padding: 10px; font-size: 12px; color: #888;">
            <p>© ${new Date().getFullYear()} Your App Name. All rights reserved.</p>
          </div>
        </div>
      </div>
      `,

     })
}


export default sendMail;