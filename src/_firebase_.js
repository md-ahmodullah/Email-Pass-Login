// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnxjzsUrxW-sEpjBXJLoBc3cWGIry7z_Y",
  authDomain: "manlog-1943a.firebaseapp.com",
  projectId: "manlog-1943a",
  storageBucket: "manlog-1943a.firebasestorage.app",
  messagingSenderId: "838592898076",
  appId: "1:838592898076:web:0d0e3b0e7d0463301d6bd9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
