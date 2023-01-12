import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

export const GraphDescription = ({Gtitle, Gdesc}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Typography
        variant="h4"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {Gtitle}
      </Typography>
      <Typography variant="h6" color={colors.greenAccent[400]}>
        {Gdesc}
      </Typography>
    </Box>
  );
};
