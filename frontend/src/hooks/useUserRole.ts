import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async (user: User) => {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setRole(userSnap.data().role);
      } else {
        setRole(null);
      }
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchRole(user);
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { role, loading };
} 