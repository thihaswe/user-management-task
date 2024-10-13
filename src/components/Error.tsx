"use client";
import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
interface Prop {
  message?: string;
}

const ErrorPage = ({ message }: Prop) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Go back to the previous page
  };

  const handleRefresh = () => {
    window.location.reload(); // Refresh the current page
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {message || "Something went wrong."}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button onClick={handleGoBack} sx={{ mb: 2 }}>
          Go Back
        </Button>
        <Button onClick={handleRefresh} variant="contained">
          Try Again
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;
