// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuk71HV6bulm8ec-63C4osAONHRLMMhR0",
  authDomain: "alihelper-8a62d.firebaseapp.com",
  projectId: "alihelper-8a62d",
  storageBucket: "alihelper-8a62d.appspot.com",
  messagingSenderId: "60154718509",
  appId: "1:60154718509:web:a8e716f3cbf2adf2b00ba4",
  measurementId: "G-3FQKHGGCFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const storage = getStorage(app);