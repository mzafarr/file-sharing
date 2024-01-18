// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2uIR6uxRZdlZREFx4rnEpjGD9oaj4WD8",
  authDomain: "friendlychat-6b7c3.firebaseapp.com",
  projectId: "friendlychat-6b7c3",
  storageBucket: "friendlychat-6b7c3.appspot.com",
  messagingSenderId: "99714454282",
  appId: "1:99714454282:web:92d3ecab93cda05ce820f3"
};
console.log(firebaseConfig);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
