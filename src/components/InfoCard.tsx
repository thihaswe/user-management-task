import Loading from "@/components/Loading";
import { useUser } from "@/hooks/useUsers";
import { Address, Bank, Company, Coordinates, Crypto, User } from "@/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";

interface Prop {
  handleToggle: (para: string) => void;
  handlePara: string;
  header: string;
  section: boolean;
  userInfo: User | Company | Address | Bank;
  additional?: Address | Crypto;
}

const InfoCard = ({ prop }: { prop: Prop }) => {
  const { handleToggle, handlePara, header, section, userInfo, additional } =
    prop;
  return (
    <Box>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => handleToggle(handlePara)}>
          <ExpandMoreIcon
            sx={{
              transform: section ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          {header}
        </Typography>
      </Box>
      <Collapse in={section}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Field</strong>
                </TableCell>
                <TableCell>
                  <strong>Details</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(userInfo).map(([key, value]) => {
                if (typeof value !== "object" && value !== null) {
                  return (
                    <TableRow key={key}>
                      <TableCell>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, " $1")}
                      </TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  );
                }

                if (key === "hair") {
                  return (
                    <>
                      <TableRow key={`${key}-color`}>
                        <TableCell>Hair Color</TableCell>
                        <TableCell>{value.color}</TableCell>
                      </TableRow>
                      <TableRow key={`${key}-type`}>
                        <TableCell>Hair Type</TableCell>
                        <TableCell>{value.type}</TableCell>
                      </TableRow>
                    </>
                  );
                } else if (key === "coordinates") {
                  return (
                    <>
                      <TableRow key={`${key}-latitude`}>
                        <TableCell>Latitude</TableCell>
                        <TableCell>{value.lat}</TableCell>
                      </TableRow>
                      <TableRow key={`${key}-longtitude`}>
                        <TableCell>Longtitude</TableCell>
                        <TableCell>{value.lng}</TableCell>
                      </TableRow>
                    </>
                  );
                }

                return null;
              })}

              {additional &&
                Object.entries(additional).map(([key, value]) => {
                  if (
                    typeof value !== "object" &&
                    value !== null &&
                    value !== undefined
                  ) {
                    return (
                      <TableRow key={key}>
                        <TableCell>
                          {key.charAt(0).toUpperCase() +
                            key.slice(1).replace(/([A-Z])/g, " $1")}
                        </TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    );
                  }
                  if (
                    key === "coordinates" &&
                    value !== undefined &&
                    value !== null
                  ) {
                    return (
                      <>
                        <TableRow key={`${key}-latitude`}>
                          <TableCell>Latitude</TableCell>
                          <TableCell>{value.lat}</TableCell>
                        </TableRow>
                        <TableRow key={`${key}-longtitude`}>
                          <TableCell>Longtitude</TableCell>
                          <TableCell>{value.lng}</TableCell>
                        </TableRow>
                      </>
                    );
                  }

                  return null;
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Box>
  );
};

export default InfoCard;
