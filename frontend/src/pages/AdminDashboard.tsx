import React, { useState } from "react";
import { getIdToken } from "firebase/auth";
import { auth } from "../firebase";

const AdminDashboard: React.FC = () => {
  const [response, setResponse] = useState<string>("");

  const callAdminApi = async () => {
    const user = auth.currentUser;
    if (!user) {
      setResponse("Not logged in");
      return;
    }
    const token = await getIdToken(user, true);
    const res = await fetch("http://localhost:3001/admin-data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setResponse(JSON.stringify(data));
  };

  return (
    <div>
      <div>Welcome to the Admin Dashboard!</div>
      <button onClick={callAdminApi}>Call Admin API</button>
      {response && <pre>{response}</pre>}
    </div>
  );
};

export default AdminDashboard; 