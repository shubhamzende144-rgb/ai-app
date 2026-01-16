// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVzT-HhJSJIw_GyGDF1sAVfb6qtzjS1lQ",
  authDomain: "ai-app-1610d.firebaseapp.com",
  projectId: "ai-app-1610d",
  storageBucket: "ai-app-1610d.firebasestorage.app",
  messagingSenderId: "4077095993",
  appId: "1:4077095993:web:2ad951b9c798a11df851e8",
  measurementId: "G-T5S2GLRMXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);