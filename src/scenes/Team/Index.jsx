import { onValue, ref } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
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
  Box,
  useTheme,
  IconButton,
} from "@mui/material";
import "./Team.css";
import { ColorModeContext } from "../../theme";

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
  const goToStats = () => {
    navigate("/Activity");
  };
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Header title="Team Members" subtitle="Employees"  />
        <IconButton>
          {theme.palette.mode === "dark" ? (
            <Button
              sx={{ color: "#0ac392", cursor: "pointer" }}
              onClick={goToStats}
            >
              View Team Stats
            </Button>
          ) : (
            <Button
              sx={{ backgroundcolor: "#3da58a", cursor: "pointer" }}
              onClick={goToStats}
            >
              View Team Stats
            </Button>
          )}
        </IconButton>
      </Box>

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
