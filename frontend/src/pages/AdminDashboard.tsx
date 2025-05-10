import React, { useEffect, useState, useCallback } from "react";
import DashboardLayout from "./DashboardLayout";
import { Box, Typography } from "@mui/material";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import UserTable, { UserWithAuthStatus } from "../components/organisms/UserTable";
import EditUserRoleModal from "../components/molecules/EditUserRoleModal";
import DeleteUserDialog from "../components/molecules/DeleteUserDialog";
import FeedbackSnackbar from "../components/atoms/FeedbackSnackbar";
import { getAuth } from "firebase/auth";

const roleOptions = ["patient", "therapist", "admin"];

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<UserWithAuthStatus[]>([]);
  const [editUser, setEditUser] = useState<UserWithAuthStatus | null>(null);
  const [editRole, setEditRole] = useState<string>("");
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });
  const [authUids, setAuthUids] = useState<string[]>([]);

  const fetchUsers = useCallback(async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    let token = "";
    if (user) token = await user.getIdToken();
    const response = await fetch("http://localhost:3001/admin/all-users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const uids = data.authUids as string[];
    setAuthUids(uids);
    const usersList: UserWithAuthStatus[] = data.users.map((user: any) => ({
      id: user.id ?? "",
      email: user.email ?? "",
      role: user.role ?? "",
      firstname: user.firstname ?? "",
      lastname: user.lastname ?? "",
      hasAuthRecord: uids.includes(user.id),
    }));
    setUsers(usersList);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user: UserWithAuthStatus) => {
    setEditUser(user);
    setEditRole(user.role);
  };

  const handleEditSave = async () => {
    if (editUser) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error("Not authenticated");
        const token = await user.getIdToken();

        const response = await fetch("http://localhost:3001/admin/set-role", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uid: editUser.id, role: editRole }),
        });
        if (!response.ok) throw new Error("Failed to set user role");
        setSnackbar({ open: true, message: "User role updated!", severity: "success" });
        setEditUser(null);
        fetchUsers();
      } catch {
        setSnackbar({ open: true, message: "Failed to update user role.", severity: "error" });
      }
    }
  };

  const handleEditSaveDisabled = () => {
    setSnackbar({ open: true, message: "Cannot change role: user has no Auth record (manually created in database)", severity: "error" });
  };

  const handleDelete = async () => {
    if (deleteUserId) {
      try {
        await deleteDoc(doc(db, "users", deleteUserId));
        setSnackbar({ open: true, message: "User deleted!", severity: "success" });
        setDeleteUserId(null);
        fetchUsers();
      } catch {
        setSnackbar({ open: true, message: "Failed to delete user.", severity: "error" });
      }
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Admin!
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          All Users
        </Typography>
        <UserTable users={users} onEdit={handleEdit} onDelete={setDeleteUserId} />
      </Box>
      <EditUserRoleModal
        open={!!editUser}
        user={editUser}
        roleOptions={roleOptions}
        editRole={editRole}
        setEditRole={setEditRole}
        onClose={() => setEditUser(null)}
        onSave={editUser?.hasAuthRecord === false ? handleEditSaveDisabled : handleEditSave}
      />
      <DeleteUserDialog
        open={!!deleteUserId}
        onClose={() => setDeleteUserId(null)}
        onDelete={handleDelete}
      />
      <FeedbackSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </DashboardLayout>
  );
};

export default AdminDashboard; 