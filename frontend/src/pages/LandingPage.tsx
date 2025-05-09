import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";

const roleToDashboard: Record<string, string> = {
  patient: "/patient",
  therapist: "/therapist",
  admin: "/admin"
};

const LandingPage: React.FC = () => {
  const { role, loading } = useUserRole();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>Welcome to the Physiotherapy AI Portal</h1>
      <p>Your digital assistant for physiotherapists and patients.</p>
      {role ? (
        <>
          <div>You are already logged in.</div>
          <button onClick={() => navigate(roleToDashboard[role] || '/')}>Go to Dashboard</button>
        </>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
    </div>
  );
};

export default LandingPage; 