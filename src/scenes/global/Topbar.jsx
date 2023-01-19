import React from "react";
import { Box, IconButton, useTheme,Button } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";



export const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Box display="flex">
       
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Button sx={{backgroundColor:"white",borderRadius:"10px"}}>Dark Mode</Button>
          ) : (
            <Button sx={{color:"white",backgroundColor:"black",borderRadius:"10px"}}>Light Mode</Button>
          )}
        </IconButton>
      </Box>
    </Box>
  );
};
