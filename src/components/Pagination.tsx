import React from "react";
import { Box, Button } from "@mui/material";

interface Prop {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Prop) => {
  // Determine the range of pages to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    let startPage = Math.max(1, currentPage - 2);
    let endPage = startPage + 4;

    // Adjust the start and end pages if they exceed the total pages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - 4;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 0",
        width: "100%",
      }}
    >
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outlined"
        style={{ margin: "0 4px" }}
      >
        {"<"}
      </Button>

      {currentPage > 1 && pageNumbers[0] > 1 && (
        <>
          <Button
            onClick={() => onPageChange(1)}
            variant="outlined"
            style={{ margin: "0 4px" }}
          >
            1
          </Button>
          {pageNumbers[0] > 2 && <span style={{ margin: "0 4px" }}>...</span>}
        </>
      )}

      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => onPageChange(number)}
          variant="outlined"
          style={{
            margin: "0 4px",
            padding: "8px 12px",
            cursor: "pointer",
            backgroundColor: currentPage === number ? "#007bff" : "#fff",

            color: currentPage === number ? "#fff" : "#007bff",
          }}
        >
          {number}
        </Button>
      ))}

      {currentPage < totalPages &&
        pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span style={{ margin: "0 4px" }}>...</span>
            )}
            <Button
              onClick={() => onPageChange(totalPages)}
              variant="outlined"
              style={{ margin: "0 4px" }}
            >
              {totalPages}
            </Button>
          </>
        )}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outlined"
        style={{ margin: "0 4px" }}
      >
        {">"}
      </Button>
    </Box>
  );
};

export default Pagination;
