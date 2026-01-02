import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public"); // make sure ./public exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // safer unique filename
  },
});

const upload = multer({ storage });
export default upload;
