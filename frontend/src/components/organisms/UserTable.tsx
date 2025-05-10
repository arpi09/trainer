import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from '@mui/material/Tooltip';

export interface User {
  id: string;
  email: string;
  role: string;
  firstname?: string;
  lastname?: string;
}

export interface UserWithAuthStatus extends User {
  hasAuthRecord: boolean;
}

interface UserTableProps {
  users: UserWithAuthStatus[];
  onEdit: (user: UserWithAuthStatus) => void;
  onDelete: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.role}
              {!user.hasAuthRecord && (
                <Tooltip title="User must log in or be enabled by admin to activate their account.">
                  <span style={{ color: 'red', marginLeft: 8, fontSize: 12 }}>
                    (Disabled: No Auth Record)
                  </span>
                </Tooltip>
              )}
            </TableCell>
            <TableCell align="right">
              <IconButton onClick={() => onEdit(user)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(user.id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default UserTable; 