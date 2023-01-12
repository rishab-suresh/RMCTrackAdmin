import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";

import { LightModeOutlined } from "@mui/icons-material";
import { DarkModeOutlined } from "@mui/icons-material";
import { NotificationsOutlined } from "@mui/icons-material";
import { SettingsOutlined } from "@mui/icons-material";
import { PersonOutlineOutlined } from "@mui/icons-material";

export const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Box display="flex">
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        <IconButton>
          <PersonOutlineOutlined />
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};
