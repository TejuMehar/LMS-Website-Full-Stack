import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description : {
        type: String,
    },
    email: {
        type: String,
        requyire: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['student', 'educator'],
        require: true
    },
    photoUrl: {
        type: String,
        default: " "
    },
    enrollCourses: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: "Course"
    }]
},{timestamps: true});

const User = mongoose.model("User",userSchema);

export default(User);