"use client";
import ErrorPage from "@/components/Error";
import Loading from "@/components/Loading";
import UserFIlter from "@/components/UserFIlter";
import { Filter, User } from "@/types";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Input, InputAdornment, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import UserTable from "../../components/UserTable";
import { useSearchUser, useUsers } from "../../hooks/useUsers";

const UsersPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setfilter] = useState<Filter>({
    limit: 0,
    skip: 0,
    sortBy: "",
    order: "",
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Fetch users with the specified limit and skip
  const { limit, skip, sortBy, order } = filter;
  const { data, isLoading, isError, error } = useUsers(
    limit,
    skip,
    sortBy,
    order
  );

  // Fetch users by search term using the custom hook
  const {
    data: searchedUser,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
    error: searchError,
  } = useSearchUser(searchTerm);

  // {server-site user filter}
  // const usersToDisplay: User[] = searchTerm
  //   ? searchedUser && searchedUser.length > 0
  //     ? [...searchedUser]
  //     : []
  //   : data || [];

  /* client-site user filter*/
  const filteredUsers: User[] =
    data?.filter((user: User) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    }) || [];

  const pageLimit = 10;
  /* client-site user filter*/
  const totalFilteredPages = Math.ceil(filteredUsers.length / pageLimit);
  // const totalFilteredPages = Math.ceil(usersToDisplay.length / pageLimit);

  //filter the total users ??
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
  if ((isError && error) || (isErrorSearch && searchError))
    return <ErrorPage message={error?.message || searchError?.message} />;

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
        />
      </Box>

      {/* client-site user filter*/}
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

      {/* {server site user filter} */}
      {/* {usersToDisplay.length > 0 ? (
        <>
          <UserTable
            users={usersToDisplay.slice(
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
      ) : isLoadingSearch ? (
        <Loading />
      ) : (
        <Typography>No users found</Typography>
      )} */}
    </Box>
  );
};

export default UsersPage;
