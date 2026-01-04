import mongoose from "mongoose";

const lactureSchema = new mongoose.Schema({
   lactureTitle : {
    type : String,
    required : true
   },
   videoUrl : {
    type : String,
    required : true
   },
   isPreviewFree:{
    type : Boolean,
   },
}, { timestamps: true });

export const Lacture = mongoose.model("Lacture", lactureSchema);
export default Lacture;