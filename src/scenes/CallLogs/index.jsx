import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebaseconfig";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  InputBase,
  useTheme,
  IconButton,
  Button,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { tokens } from "../../theme";

export const CallLogs = () => {
  const [calls, setCalls] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    onValue(ref(db, "All Calls"), (snapshot) => {
      setCalls(
        Object.entries(snapshot.val()).map(([userId, userData]) => ({
          userId,
          ...userData,
        }))
      );
    });
  }, [setCalls]);

  const filteredCalls = calls.filter(
    (calls) =>
      calls.Name.toString().toLowerCase().includes(search.toLowerCase()) ||
      calls.Phone.toString().toLowerCase().includes(search.toLowerCase())
  );

  // Determine the starting and ending index of calls for the current page
  const indexOfLastCall = currentPage * pageSize;
  const indexOfFirstCall = indexOfLastCall - pageSize;

  // Slice the calls array to get the calls for the current page
  const currentCalls = filteredCalls.slice(indexOfFirstCall, indexOfLastCall);

  // Determine the number of pages based on the total number of calls and page size
  const totalPages = Math.ceil(filteredCalls.length / pageSize);

  return (
    <>
      <Header title="Call Logs" subtitle="All Call Logs are listed here" />

      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <Search />
        </IconButton>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Query</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentCalls.map((call) => (
            <TableRow key={call.callId}>
              <TableCell>{call.Name}</TableCell>
              <TableCell>{call.Phone}</TableCell>
              <TableCell>{call.Team}</TableCell>
              <TableCell>{call.Query}</TableCell>
              <TableCell>{call.City}</TableCell>
              <TableCell>{call.Date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        className="pagination"
        sx={{ margin: "10px" }}
        color={colors.greenAccent[500]}
      >
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          variant="contained"
        >
          Previous
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          variant="contained"
        >
          Next
        </Button>
      </Box>
    </>
  );
};
