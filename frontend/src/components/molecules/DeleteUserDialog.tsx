import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface DeleteUserDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ open, onClose, onDelete }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete User</DialogTitle>
    <DialogContent>
      Are you sure you want to delete this user?
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onDelete} color="error" variant="contained">Delete</Button>
    </DialogActions>
  </Dialog>
);

export default DeleteUserDialog; 