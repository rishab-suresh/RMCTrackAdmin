import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { db } from "../../firebaseconfig";
import { onValue, ref } from "firebase/database";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";

export const Remarks = () => {
  const [call, setCall] = useState({});
  const { callId } = useParams();
  useEffect(() => {
    if (callId) {
      onValue(ref(db, `users/Calls/${callId}`), (snapshot) => {
        const callData = snapshot.val();
        setCall(callData);
      });
    }
  }, [callId]);

  if (!call) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Box>
        <Header title="Remarks" subtitle={call.Phone} />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Query</TableCell>
            <TableCell>Remarks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{call.Query}</TableCell>
            <TableCell>{call.Remarks}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
