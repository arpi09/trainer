// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo8odJiSJG_f8QOvykv1ANAN0tT-jQC2w",
  authDomain: "trainer-cf9d0.firebaseapp.com",
  projectId: "trainer-cf9d0",
  storageBucket: "trainer-cf9d0.firebasestorage.app",
  messagingSenderId: "544393998955",
  appId: "1:544393998955:web:a84847662bfb5eff13772e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
