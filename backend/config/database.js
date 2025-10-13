import mongoose from "mongoose";


const connectDB =async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URL,
    //     {
    //     useNewUrlParser:true,
    //     useUnifiedTopology:true,
    //    }
    );
       console.log("MongoDB connected successfully");
    }catch(error){
        console.error("Error in Database Conection",error);
        process.exit(1);
    }
}

export default connectDB;