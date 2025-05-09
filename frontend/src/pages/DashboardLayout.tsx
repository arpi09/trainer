import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;
const collapsedWidth = 60;

const menuItems = [
  { label: "Patient", icon: <FitnessCenterIcon />, path: "/patient" },
  { label: "Therapist", icon: <GroupIcon />, path: "/therapist" },
  { label: "Admin", icon: <AdminPanelSettingsIcon />, path: "/admin" },
];

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedWidth,
            boxSizing: "border-box",
            transition: "width 0.2s",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          <IconButton onClick={() => setOpen((prev) => !prev)} sx={{ m: 1 }}>
            <MenuIcon />
          </IconButton>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} onClick={() => navigate(item.path)} component="button">
                <ListItemIcon>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.label} />}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Divider />
          <List>
            <ListItem onClick={handleLogout} component="button">
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" />}
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout; 