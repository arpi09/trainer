import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import TherapistDashboard from './pages/TherapistDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient" element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/therapist" element={
          <ProtectedRoute allowedRoles={["therapist"]}>
            <TherapistDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
