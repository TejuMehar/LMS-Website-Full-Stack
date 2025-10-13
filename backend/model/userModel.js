import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // ✅ fixed
  },
  description: {
    type: String
  },
  email: {
    type: String,
    required: true, // ✅ fixed (was "requyire")
    unique: true
  },
  password: {
    type: String,
    required: true // ✅ correct
  },
  role: {
    type: String,
    enum: ["student", "educator"],
    required: true // ✅ fixed
  },
  photoUrl: {
    type: String,
    default: " "
  },
  enrollCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },
  ],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
