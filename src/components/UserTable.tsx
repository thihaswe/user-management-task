import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { User } from "../types";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/users/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ border: "1px solid #ddd" }}>ID</TableCell>
            <TableCell style={{ border: "1px solid #ddd" }}>Name</TableCell>
            <TableCell style={{ border: "1px solid #ddd" }}>Email</TableCell>
            <TableCell style={{ border: "1px solid #ddd" }}>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => handleRowClick(user.id)}
              style={{ cursor: "pointer" }}
            >
              <TableCell style={{ border: "1px solid #ddd" }}>
                {user.id}
              </TableCell>
              <TableCell
                style={{ border: "1px solid #ddd" }}
              >{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell style={{ border: "1px solid #ddd" }}>
                {user.email}
              </TableCell>
              <TableCell style={{ border: "1px solid #ddd" }}>
                {user.age}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
