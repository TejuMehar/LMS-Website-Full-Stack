import multer from "multer"



let storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cd)=>{
        cb(null,file.originalname);
    }
})

const upload = multer(storage);
export default upload;