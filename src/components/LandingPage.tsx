"use client";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";

import Image from "next/image";
import { useRouter } from "next/navigation";
const LandingPage = () => {
  const router = useRouter();
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mt: 8,
          mb: 4,
        }}
      >
        {/* <Avatar sx={{ width: 120, height: 120, mb: 2 }}>
          <Image
            src="/your-profile-picture.jpg"
            alt="Thiha Swe"
            layout="fill"
          />
        </Avatar> */}
        <Avatar sx={{ bgcolor: "gray" }} />

        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Hi, I'm Thiha Swe
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: "#666" }}>
          Passionate Web Developer
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          I am deeply interested in web development and enjoy creating sleek,
          user-friendly applications. I have expertise in modern web
          technologies like React, TypeScript, and Material UI (MUI).
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 6 }}
          onClick={() =>
            handleNavigate("https://my-portfolio-thihaswe.vercel.app")
          }
        >
          Learn More About Me
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 4,
          p: 4,
          textAlign: "center",
          boxShadow: 5,
          mb: 8,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          User-Task Management Assignment
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          In my latest project, I built a user-task management application using
          React, TypeScript, MUI, and React Query. The app is designed to
          simplify user management with features like fetching user data,
          managing tasks, and providing a smooth, interactive user experience.
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          The project emphasizes efficient data handling with React Query and
          clean, responsive UI design using Material UI. It is a perfect blend
          of my skills and passion for creating functional, beautiful web
          applications.
        </Typography>
        <Button variant="outlined" onClick={() => handleNavigate("/users")}>
          View Project
        </Button>
      </Box>
    </Container>
  );
};
export default LandingPage;
