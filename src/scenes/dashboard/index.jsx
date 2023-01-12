import { Box } from "@mui/material";
import React from "react";
import { GraphDescription } from "../../components/GraphDescription";
import { Header } from "../../components/Header";
import { CallGraph } from "../../data/LineChart";
import { LoginStatus } from "../../data/LoginStatus";

export const DashBoard = () => {
  return (
    <Box>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="General Overview" />
        </Box>
      </Box>
      <Box m="30px">
        <GraphDescription
          Gtitle="No.Of Calls A Day"
          Gdesc="Amount of Calls a Day"
        />
        <Box display="flex" flexDirection="row">
          <Box mr={2}>
            <CallGraph />
          </Box>
          <Box width="100%">
            <LoginStatus />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
