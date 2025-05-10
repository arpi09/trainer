import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { Box, Typography } from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import UserTable, { UserWithAuthStatus } from "../components/organisms/UserTable";

const TherapistDashboard: React.FC = () => {
  const [patients, setPatients] = useState<UserWithAuthStatus[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      const q = query(
        collection(db, "users"),
        where("role", "==", "patient"),
        where("therapistId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const patientsList: UserWithAuthStatus[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email,
        role: doc.data().role,
        hasAuthRecord: true,
      }));
      setPatients(patientsList);
    };
    fetchPatients();
  }, []);

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Therapist!
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Your Patients
        </Typography>
        <UserTable users={patients} onEdit={() => {}} onDelete={() => {}} />
      </Box>
    </DashboardLayout>
  );
};

export default TherapistDashboard; 