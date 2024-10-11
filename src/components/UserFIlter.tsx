import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";

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

interface Prop {
  filter: Filter;
  setfilter: (para: Filter) => void;
  handleSearch: (para: React.FormEvent<HTMLFormElement>) => void;
}

const UserFIlter = ({ filter, setfilter, handleSearch }: Prop) => {
  return (
    <form
      onSubmit={handleSearch}
      style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
    >
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <TextField
          id="userlimit"
          name="limit"
          label="User Limit"
          type="number"
          defaultValue={filter.limit}
          slotProps={{
            htmlInput: {
              min: 0,
            },
          }}
          fullWidth
        />
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <TextField
          id="skip"
          name="skip"
          label="Skip"
          type="number"
          defaultValue={filter.skip}
          slotProps={{
            htmlInput: {
              min: 0,
            },
          }}
          fullWidth
        />
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel id="sortBy-label">Sort By</InputLabel>
        <Select
          labelId="sortBy-label"
          id="sortBy"
          name="sortBy"
          defaultValue={filter.sortBy}
          label="Sort By"
        >
          <MenuItem value="">Select Sort Option</MenuItem>
          <MenuItem value="firstName">First Name</MenuItem>
          <MenuItem value="lastName">Last Name</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel id="order-label">Order</InputLabel>
        <Select
          labelId="order-label"
          id="order"
          name="order"
          defaultValue={filter.order}
          label="Order"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        type="submit"
        startIcon={<SearchIcon />}
        sx={{
          minWidth: 100,
          height: "56px",
          padding: "10px 20px",
        }}
      >
        Search
      </Button>
    </form>
  );
};

export default UserFIlter;
