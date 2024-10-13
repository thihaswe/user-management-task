"use client";
import ErrorPage from "@/components/Error";
import InfoCard from "@/components/InfoCard";
import Loading from "@/components/Loading";
import { useUser } from "@/hooks/useUsers";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const UserDetail: React.FC = () => {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, isError, error } = useUser(id);

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    biography: true,
    address: true,
    company: true,
    finance: true,
    crypto: true,
  });

  const handleToggle = (section: string) => {
    setExpandedSections((prev: Record<string, boolean>) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage message={error.message} />;

  if (data === undefined) {
    return <Box>no data found</Box>;
  }

  const { company, address, bank, crypto, ...rest } = data;

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <Card style={{ maxWidth: 800, width: "100%" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {`${data?.firstName} ${data?.lastName}`}
          </Typography>
          <Image
            src={data?.image || ""}
            alt={`${data?.firstName} ${data?.lastName}`}
            width={128}
            height={128}
            style={{
              borderRadius: "50%",
              marginBottom: "20px",
            }}
          />

          {/* personal information Section */}
          {rest && (
            <InfoCard
              prop={{
                section: "biography",
                handleToggle,
                onOff: expandedSections.biography,
                header: "Personal Information",
                userInfo: rest,
              }}
            />
          )}
          <Divider sx={{ my: 2 }} />

          {/* Address Section */}
          {address && (
            <InfoCard
              prop={{
                section: "address",
                handleToggle,
                onOff: expandedSections.address,
                header: "Address",
                userInfo: address,
              }}
            />
          )}

          <Divider sx={{ my: 2 }} />

          {/* Company Section */}
          {company && (
            <InfoCard
              prop={{
                section: "company",
                handleToggle,
                onOff: expandedSections.company,
                header: "Company",
                userInfo: company,
                additional: company.address,
              }}
            />
          )}
          <Divider sx={{ my: 2 }} />

          {/* Finance Section */}
          {bank && (
            <InfoCard
              prop={{
                section: "finance",
                handleToggle,
                onOff: expandedSections.finance,
                header: "Bank",
                userInfo: bank,
              }}
            />
          )}
          <Divider sx={{ my: 2 }} />

          {crypto && (
            <InfoCard
              prop={{
                section: "crypto",
                handleToggle,
                onOff: expandedSections.crypto,
                header: "Crypto",
                userInfo: crypto,
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetail;
