"use client";

import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
export const TopBar = () => {
  return (
    <AppBar
      sx={{
        width: "calc(100vw - 150px)",
        height: 64,
        backgroundColor: "#f4f4f4",
        borderBottom: "1px solid black",
        ml: 3,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
          User Management
        </Typography>

        <Avatar sx={{ bgcolor: "gray" }} />
      </Toolbar>
    </AppBar>
  );
};
