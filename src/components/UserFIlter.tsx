import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Menu,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Filter } from "@/types";

interface Prop {
  filter: Filter;
  setfilter: (para: Filter) => void;
  handleSearch: (para: React.FormEvent<HTMLFormElement>) => void;
}

const UserFilter = ({ filter, setfilter, handleSearch }: Prop) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClick}
        startIcon={<FilterListIcon />}
        sx={{ mb: 2 }}
      >
        Filter
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            p: 2,
            width: 300,
          }}
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
        </Box>
      </Menu>
    </Box>
  );
};

export default UserFilter;
