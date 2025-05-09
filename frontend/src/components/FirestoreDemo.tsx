import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

const FirestoreDemo: React.FC = () => {
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "testCollection"));
      setDocs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  const addTestDoc = async () => {
    await addDoc(collection(db, "testCollection"), { timestamp: Date.now() });
    alert("Document added!");
  };

  const fetchRoleInfo = async (userRole: string) => {
    const roleDoc = await getDoc(doc(db, "roles", userRole));
    if (roleDoc.exists()) {
      return roleDoc.data();
    } else {
      return null;
    }
  };

  return (
    <div>
      <button onClick={addTestDoc}>Add Test Document</button>
      <ul>
        {docs.map(doc => (
          <li key={doc.id}>{JSON.stringify(doc)}</li>
        ))}
      </ul>
    </div>
  );
};

export default FirestoreDemo; 