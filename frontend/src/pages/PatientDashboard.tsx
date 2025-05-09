import React from "react";
import DashboardLayout from "./DashboardLayout";
import { Box, Typography, Card, CardContent, CardActions, Button } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const mockUpcomingTraining = {
  title: "Leg Day Workout",
  date: "2024-05-12",
  time: "18:00",
  description: "Squats, lunges, and calf raises. Focus on form and breathing.",
};

const PatientDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, Patient!
        </Typography>

        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <FitnessCenterIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Upcoming Training</Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
              {mockUpcomingTraining.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mockUpcomingTraining.date} at {mockUpcomingTraining.time}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {mockUpcomingTraining.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" color="primary">
              View Details
            </Button>
          </CardActions>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default PatientDashboard; 