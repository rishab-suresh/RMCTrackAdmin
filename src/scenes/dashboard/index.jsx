import { Box } from "@mui/material";
import React from "react";
import { GraphDescription } from "../../components/GraphDescription";
import { Header } from "../../components/Header";
import { CallGraph } from "../../data/LineChart";
import { LoginStatus } from "../../data/LoginStatus";
import { useState } from "react";


export const DashBoard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Box>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="DASHBOARD"
            subtitle="General Overview"
            setIsLoggedIn={setIsLoggedIn}
          />
        </Box>
      </Box>
      <Box m="30px">
        <GraphDescription
          Gtitle="No.Of Calls A Day"
          Gdesc="Amount of Calls a Day"
        />
        <Box display="flex" flexDirection="row">
          <Box>
            <CallGraph />
          </Box>
          <Box width="100%" mb="10px">
            <LoginStatus />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
