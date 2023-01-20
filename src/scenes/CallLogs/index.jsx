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
import moment from "moment/moment";
import { Link, useNavigate } from "react-router-dom";

export const CallLogs = () => {
  const [calls, setCalls] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;
  const theme = useTheme();
  const Navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const [dateFilter, setDateFilter] = useState({
    date: null,
    month: null,
    year: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onValue(ref(db, "users"), (snapshot) => {
      const allCalls = Object.entries(snapshot.val()).map(
        ([userId, userData]) => {
          const calls = userData.Calls;
          if (calls) {
            return Object.entries(calls).map(([callId, callData]) => {
              return {
                userId,
                callId,
                ...callData,
              };
            });
          }
        }
      );
      setCalls(allCalls.flat());
    });
  }, [setCalls]);

  const filteredCalls = calls.filter((call) => {
    if (dateFilter.date) {
      const callDate = new Date(call.Date);
      const filterDate = new Date(dateFilter.date);
      const callMonth = moment(callDate).format("MMM");
      const callYear = moment(callDate).format("YYYY");
      const filterMonth = moment(filterDate).format("MMM");
      const filterYear = moment(filterDate).format("YYYY");
      if (search !== "") {
        return (
          (call.Name.toLowerCase().includes(search.toLowerCase()) ||
            call.Phone.toString().includes(search) ||
            call.Team.toLowerCase().includes(search.toLowerCase()) ||
            call.Query.toLowerCase().includes(search.toLowerCase()) ||
            call.City.toLowerCase().includes(search.toLowerCase())) &&
          callMonth === filterMonth &&
          callYear === filterYear
        );
      }
      return callMonth === filterMonth && callYear === filterYear;
    }
    return true;
  });

  console.log(filteredCalls);

  // Determine the starting and ending index of calls for the current page
  const indexOfLastCall = currentPage * pageSize;
  const indexOfFirstCall = indexOfLastCall - pageSize;
  const currentCalls = filteredCalls.slice(indexOfFirstCall, indexOfLastCall);
  const totalPages = Math.ceil(filteredCalls.length / pageSize);

  return (
    <>
      <Header
        title="Call Logs"
        subtitle="All Call Logs are listed here"
        setIsLoggedIn={setIsLoggedIn}
      />

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
      <Box>
        <input
          type="month"
          value={dateFilter.date || ""}
          onChange={(e) =>
            setDateFilter({ ...dateFilter, date: e.target.value })
          }
        />
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Complete</TableCell>
            <TableCell>CompleteDate</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Remarks </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentCalls.map((call) => (
            <TableRow key={call.callId}>
              <TableCell>{call.Name}</TableCell>
              <TableCell>{call.Phone}</TableCell>
              <TableCell>{call.Category}</TableCell>
              <TableCell>{call.Complete}</TableCell>
              <TableCell>{call.CompleteDate}</TableCell>
              <TableCell>{call.City}</TableCell>
              <TableCell>{call.Date}</TableCell>
              <TableCell>
                {" "}
                <Link to={`/remarks/${call.Phone}`}>
                  <Button>Remarks</Button>
                </Link>
              </TableCell>
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
