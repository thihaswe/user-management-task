"use client";
import React, { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import UserTable from "../../components/UserTable";
import Pagination from "../../components/Pagination";
import { Typography } from "@mui/material";
import { User } from "@/types";
import SearchIcon from "@mui/icons-material/Search";

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setfilter] = useState<{
    limit: number;
    skip: number;
    sortBy: string;
    order: string;
  }>({
    limit: 0,
    skip: 0,
    sortBy: "",
    order: "",
  });

  // Pagination limit
  const pageLimit = 10;

  // Fetch users with the specified limit and skip

  const { limit, skip, sortBy, order } = filter;
  const { data, isLoading } = useUsers(limit, skip, sortBy, order);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Filter users based on the search term
  const filteredUsers: User[] =
    //@ts-ignore
    data?.users.filter((user: User) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    }) || [];

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
  // Calculate total pages based on filtered users
  const totalFilteredPages = Math.ceil(filteredUsers.length / pageLimit);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
        style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
      />
      <form onSubmit={handleSearch}>
        <input
          defaultValue={filter.limit}
          type="number"
          placeholder="Set user limit"
          name="limit"
          style={{ marginBottom: "20px", padding: "8px", maxWidth: "300px" }}
        />
        <input
          defaultValue={filter.skip}
          type="number"
          placeholder="Set user limit"
          name="skip"
          style={{ marginBottom: "20px", padding: "8px", maxWidth: "300px" }}
        />
        <select
          defaultValue={filter.sortBy}
          name="sortBy"
          style={{ marginBottom: "20px", padding: "8px" }}
        >
          <option value="">Sort By</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
        </select>

        <select
          defaultValue={filter.order}
          name="order"
          style={{ marginBottom: "20px", padding: "8px" }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button style={{ padding: "8px 16px", marginLeft: "10px" }}>
          <SearchIcon sx={{ fontSize: 15 }} />
        </button>
      </form>

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
    </div>
  );
};

export default UsersPage;
