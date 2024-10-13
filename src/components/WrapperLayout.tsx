"use client";

import { ReactNode } from "react";
import { TopBar } from "./TopBar";

import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sidebar } from "./SideBar";

const WrapperLayout = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: 150 }}>
          <Sidebar />
        </Box>
        {/* Main Content Area */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <TopBar />

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mt: 8,
              p: 2,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </QueryClientProvider>
  );
};

export default WrapperLayout;
