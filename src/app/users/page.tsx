"use client";
import ErrorPage from "@/components/Error";
import Loading from "@/components/Loading";
import UserFIlter from "@/components/UserFIlter";
import { Filter, User } from "@/types";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Input, InputAdornment, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import UserTable from "../../components/UserTable";
import { useSearchUser, useUsers } from "../../hooks/useUsers";

const UsersPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const defaultValue = {
    limit: 10,
    skip: 0,
    sortBy: "",
    order: "asc",
  };
  const [filter, setfilter] = useState<Filter | undefined>(undefined);
  const [user, setUser] = useState<Filter>(defaultValue);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (!searchTerm || filter) {
      setUser({ ...user, skip: (newPage - 1) * 10 });
    }
  };

  const [usersToDisplay, setUsersToDisplay] = useState<User[] | undefined>(
    undefined
  ); // Add state for users to display

  // Fetch users with the specified limit and skip
  const { data, isLoading, isError, error } = useUsers(
    filter?.limit || user.limit,
    filter?.skip || filter?.skip === 0 ? filter?.skip : user.skip,
    filter?.sortBy || user.sortBy,
    filter?.order || user.order
  );

  // Fetch users by search term
  const {
    data: searchedUser,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
    error: searchError,
  } = useSearchUser(searchTerm);

  useEffect(() => {
    if (searchTerm) {
      setUsersToDisplay(searchedUser || []); // Set searched users if available
    } else if (filter) {
      setUsersToDisplay(data?.users || []);
    } else {
      setUsersToDisplay(data?.users || []);
    }
  }, [data, searchedUser, searchTerm]);

  //filter the total users ??
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    const formData = new FormData(e.currentTarget);
    const inputLimit = formData.get("limit");
    const inputSkip = formData.get("skip");
    const sortBy = String(formData.get("sortBy"));
    const order = String(formData.get("order"));

    const limit = Number(inputLimit === "" ? 0 : inputLimit);
    const skip = Number(inputSkip === "" ? 0 : inputSkip);
    setSearchTerm("");
    setfilter({ limit, skip, sortBy, order });
  };

  const handleReset = () => {
    setSearchTerm("");
    setfilter(undefined);
    setUser(defaultValue);
  };

  if (isLoading) return <Loading />;
  if ((isError && error) || (isErrorSearch && searchError))
    return <ErrorPage message={error?.message || searchError?.message} />;

  const pageLimit = 10;

  const totalFilteredPages = searchedUser
    ? Math.ceil(searchedUser.length / pageLimit)
    : filter && usersToDisplay !== undefined
    ? Math.ceil(usersToDisplay.length / pageLimit)
    : Math.ceil(data?.total / pageLimit);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 5,
          alignItems: "center",
        }}
      >
        <Input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          sx={{
            marginBottom: "20px",
            padding: "5px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            "& .MuiInputBase-input": {
              paddingLeft: "8px",
            },
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#888" }} />{" "}
            </InputAdornment>
          }
        />

        <UserFIlter
          filter={filter}
          setfilter={setfilter}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
      </Box>

      {usersToDisplay && usersToDisplay.length > 0 ? (
        <>
          <UserTable
            users={
              searchTerm || filter
                ? usersToDisplay.slice((page - 1) * 10, page * 10)
                : usersToDisplay
            }
          />

          <Pagination
            currentPage={page}
            totalPages={totalFilteredPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : isLoadingSearch ? (
        <Loading />
      ) : (
        <Typography>No users found</Typography>
      )}
    </Box>
  );
};

export default UsersPage;
