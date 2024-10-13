"use client";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Sidebar = () => {
  const pathname = usePathname();

  const routes = [
    { path: "/", label: "Home", icon: <HomeIcon /> },
    { path: "/users", label: "Users", icon: <PeopleIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{ borderRight: "1px solid black" }}
    >
      <Box
        sx={{
          display: "flex",
          height: 75,
          backgroundColor: "#f4f4f4",
          borderBottom: "1px solid black",
          alignItems: "center",
        }}
      >
        <Image
          src={"/dashboard.png"}
          alt="dashboard.png"
          width={50}
          height={50}
          style={{ margin: "0 auto" }}
        />
      </Box>
      <List sx={{ width: 150, backgroundColor: "#f4f4f4", height: "100vh" }}>
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor:
                    pathname === route.path ? "grey" : "transparent",

                  "&:hover":
                    pathname !== route.path
                      ? {
                          backgroundColor: "grey.300",
                        }
                      : { backgroundColor: "grey" },
                }}
              >
                {React.cloneElement(route.icon, {
                  sx: {
                    fontSize: 24,
                    marginRight: 1.5,
                    color: pathname === route.path ? "black" : "grey.800",
                  },
                })}
                <ListItemText primary={route.label} sx={{ marginLeft: 2 }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};
