// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getAuth , GoogleAuthProvider } from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "loginvirtualcourses-d7cbf.firebaseapp.com",
  projectId: "loginvirtualcourses-d7cbf",
  storageBucket: "loginvirtualcourses-d7cbf.firebasestorage.app",
  messagingSenderId: "915641468291",
  appId: "1:915641468291:web:631df075b33e55cc6462b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth = getAuth(app);
 const provider  = new GoogleAuthProvider();

 export {auth,provider};