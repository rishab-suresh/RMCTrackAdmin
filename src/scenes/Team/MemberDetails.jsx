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
import "./Team.css";

export const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [calls, setCalls] = useState(null);
  const [loginTime, setLoginTime] = useState(null);
  const [workDuration, setWorkDuration] = useState(null);

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
  useEffect(() => {
    if (user && user.Activity && loginTime) {
      const today = new Date();
      const date =
        today.getDate() +
        " " +
        today.toLocaleString("en-us", { month: "short" }) +
        " " +
        today.getFullYear();
      if (user.Activity[date]) {
        const endOfShift = new Date(`${date} 19:00:00`);
        const duration = endOfShift.getTime() - new Date(loginTime).getTime();
        setWorkDuration(duration);
      }
    }
  }, [user, loginTime]);
  if (!user || !calls) {
    return <div>Loading...</div>;
  }

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
          <Box>
            {" "}
            <Typography>Is Logged In: {user.Login}</Typography>{" "}
          </Box>
          <Box>
            {" "}
            <Typography>Login Time:{loginTime}</Typography>{" "}
          </Box>
          <Box>
            {" "}
            <Typography>Work Duration: {workDuration} </Typography>{" "}
          </Box>
        </Box>
      </Box>
      <Box>
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
            {Object.entries(calls).map(([id, call]) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{call.Name}</TableCell>
                <TableCell>{call.Category}</TableCell>
                <TableCell>{call.Complete}</TableCell>
                <TableCell>{call.Remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};
