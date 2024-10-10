"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetail } from "../../../utils/api";
import { User } from "../../../types/index";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Business as BusinessIcon,
  School as SchoolIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

const UserDetail: React.FC = () => {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading } = useQuery<User | undefined>({
    queryKey: ["user", id],
    queryFn: () => fetchUserDetail(id),
    enabled: !!id,
  });

  if (isLoading) return <CircularProgress />;

  const address = data?.address
    ? `${data.address.address}, ${data.address.city}, ${data.address.state}, ${data.address.postalCode}, ${data.address.country}`
    : "Address not available";

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <Card style={{ maxWidth: 600, width: "100%" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {`${data?.firstName} ${data?.lastName}`}
          </Typography>
          <img
            src={data?.image}
            alt={`${data?.firstName} ${data?.lastName}`}
            style={{
              width: "128px",
              borderRadius: "50%",
              marginBottom: "20px",
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <AccountCircleIcon fontSize="small" />
                <strong>Username:</strong> {data?.username}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <EmailIcon fontSize="small" /> <strong>Email:</strong>
                {data?.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <PhoneIcon fontSize="small" /> <strong>Phone:</strong>
                {data?.phone || "Phone not available"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <HomeIcon fontSize="small" /> <strong>Address:</strong>
                {address}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <SchoolIcon fontSize="small" /> <strong>University:</strong>
                {data?.university || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <BusinessIcon fontSize="small" /> <strong>Company:</strong>
                {data?.company?.name || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <strong>Gender:</strong> {data?.gender}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <strong>Age:</strong> {data?.age}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <strong>Birth Date:</strong> {data?.birthDate}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                <strong>Blood Group:</strong> {data?.bloodGroup}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetail;
