import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Login: React.FC = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        // Check if user document exists
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          // Create user document with default role 'patient'
          await setDoc(userRef, {
            email: user.email,
            role: "patient"
          });
        }
      }
    } catch (error) {
      // Handle Errors here.
      console.error(error);
    }
  };

  return <button onClick={handleLogin}>Sign in with Google</button>;
};

export default Login; 