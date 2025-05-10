import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { User } from "../organisms/UserTable";

interface EditUserRoleModalProps {
  open: boolean;
  user: User | null;
  roleOptions: string[];
  editRole: string;
  setEditRole: (role: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const EditUserRoleModal: React.FC<EditUserRoleModalProps> = ({ open, user, roleOptions, editRole, setEditRole, onClose, onSave }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit User Role</DialogTitle>
    <DialogContent>
      <FormControl fullWidth>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          value={editRole}
          label="Role"
          onChange={(e) => setEditRole(e.target.value)}
        >
          {roleOptions.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onSave} variant="contained">Save</Button>
    </DialogActions>
  </Dialog>
);

export default EditUserRoleModal; 