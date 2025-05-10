import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface FeedbackSnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error";
  onClose: () => void;
}

const FeedbackSnackbar: React.FC<FeedbackSnackbarProps> = ({ open, message, severity, onClose }) => (
  <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
    <Alert severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);

export default FeedbackSnackbar; 