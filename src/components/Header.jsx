import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
export const Header = ({ title, subtitle,setIsLoggedIn }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  function handleLogout() {
    setIsLoggedIn(false);
    navigate("/Login");
  }
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};
