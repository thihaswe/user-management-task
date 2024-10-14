import { Address, Bank, Company, Crypto, User } from "@/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Collapse,
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

interface Prop {
  handleToggle: (para: string) => void;
  section: string;
  header: string;
  onOff: boolean;
  userInfo: User | Company | Address | Bank | Crypto;
  additional?: Address;
}

const InfoCard = ({ prop }: { prop: Prop }) => {
  const { handleToggle, section, header, onOff, userInfo, additional } = prop;
  return (
    <Box>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => handleToggle(section)}>
          <ExpandMoreIcon
            sx={{
              transform: onOff ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          {header}
        </Typography>
      </Box>
      <Collapse in={onOff}>
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
              {/* {main data like personal info,address,company,bank,crypto} */}
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
              {/* {additional for company address} */}
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
