"use client";
import React, { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import UserTable from "../../components/UserTable";
import Pagination from "../../components/Pagination";
import {
  Box,
  Button,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Filter, User } from "@/types";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "@/components/Loading";
import { FormControl } from "@mui/material";
import UserFIlter from "@/components/UserFIlter";

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setfilter] = useState<Filter>({
    limit: 0,
    skip: 0,
    sortBy: "",
    order: "",
  });

  // Fetch users with the specified limit and skip

  const { limit, skip, sortBy, order } = filter;
  const { data, isLoading, isError, error } = useUsers(
    limit,
    skip,
    sortBy,
    order
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Filter users based on the search term
  const filteredUsers: User[] =
    //@ts-ignore
    data?.filter((user: User) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    }) || [];

  // Calculate total pages based on filtered users
  const pageLimit = 10;
  const totalFilteredPages = Math.ceil(filteredUsers.length / pageLimit);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputLimit = formData.get("limit");
    const inputSkip = formData.get("skip");
    const sortBy = String(formData.get("sortBy"));
    const order = String(formData.get("order"));

    const limit = Number(inputLimit === "" ? 0 : inputLimit);
    const skip = Number(inputSkip === "" ? 0 : inputSkip);

    setfilter({ limit, skip, sortBy, order });
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Box>
        <Box>{error.message}</Box>
      </Box>
    );

  return (
    <Box>
      <Input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
        sx={{ marginBottom: "20px", padding: "8px", width: "300px" }}
      />
      <UserFIlter
        filter={filter}
        setfilter={setfilter}
        handleSearch={handleSearch}
      />
      {filteredUsers.length > 0 ? (
        <>
          <UserTable
            users={filteredUsers.slice(
              (page - 1) * pageLimit,
              page * pageLimit
            )}
          />
          <Pagination
            currentPage={page}
            totalPages={totalFilteredPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <Typography>No users found</Typography>
      )}
    </Box>
  );
};

export default UsersPage;
