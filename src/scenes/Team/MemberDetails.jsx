import {
  Typography,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { db } from "../../firebaseconfig";
import Pagination from "react-paginate";
import "./Team.css";

export const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [calls, setCalls] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loginTime, setLoginTime] = useState(null)

  useEffect(() => {
    onValue(ref(db, `users/${userId}`), (snapshot) => {
      setUser(snapshot.val());
    });
  }, [userId]);
  useEffect(() => {
    onValue(ref(db, `users/${userId}/Calls`), (snapshot) => {
      setCalls(snapshot.val());
    });
  }, [userId]);
  useEffect(() => {
    if (user && user.Activity) {
        const today = new Date();
        const date =
          today.getDate() +
          " " +
          today.toLocaleString("en-us", { month: "short" }) +
          " " +
          today.getFullYear();
        if (user.Activity[date]) {
            setLoginTime(user.Activity[date].Login);
        }
    }
}, [user]);
  if (!user || !calls) {
    return <div>Loading...</div>;
  }

  const rowsPerPage = 5;
  const totalPages = Math.ceil(Object.entries(calls).length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentCalls = Object.entries(calls).slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <Box>
        <Header title={user.Name} subtitle={user.EmpID} />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography>Name: {user.Name}</Typography>
          <Typography>Designation: {user.Designation}</Typography>
          <Typography>EmpID: {user.EmpID}</Typography>
          <Typography>Phone: {user.Phone}</Typography>
          <Typography>Team: {user.Team}</Typography>
        </Box>
        <Box display="flex" flexDirection="column" marginRight="30px">
          <Box> <Typography>Is Logged In: {user.Login}</Typography> </Box>
          <Box> <Typography>Login Time:{loginTime}</Typography> </Box>
          <Box> <Typography>Work Duration: </Typography> </Box>
        </Box>
      </Box>

      <Box>
        {calls ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>Remarks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCalls.map(([callId, callData]) => (
                <TableRow key={callId}>
                  <TableCell>{callId}</TableCell>
                  <TableCell>{callData.Name}</TableCell>
                  <TableCell>{callData.Category}</TableCell>
                  <TableCell>{callData.Complete}</TableCell>
                  <TableCell>{callData.Remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>Loading call data...</div>
        )}
        <Pagination
          pageCount={totalPages}
          forcePage={currentPage}
          onPageChange={handlePageChange}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          className="pagination"
        />
      </Box>
    </>
  );
};
