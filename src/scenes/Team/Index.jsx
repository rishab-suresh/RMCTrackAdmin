import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { db } from "../../firebaseconfig";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export const Team = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    onValue(ref(db, "users"), (snapshot) => {
      setUsers(
        Object.entries(snapshot.val()).map(([userId, userData]) => ({
          userId,
          ...userData,
        }))
      );
      console.log(users);
    });
  }, []);

  const handleViewProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <>
      <Header title="Team Members" subtitle="Employees" />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Emp ID</TableCell>
            <TableCell>Team</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.Name}</TableCell>
              <TableCell>{user.EmpID}</TableCell>
              <TableCell>{user.Team}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleViewProfile(user.userId)}
                >
                  View Profile
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
