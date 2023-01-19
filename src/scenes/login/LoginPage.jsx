import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";

function AuthenticationPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isloggedIn,setisLoggedIn] = useState(false)

  function handleSubmit(event) {
    event.preventDefault();

    if (username === "admin" && password === "password") {
        setisLoggedIn(true)
      navigate("/Team")
    } else {
      setError(true);
    }

  }

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="username">Username</InputLabel>
        <OutlinedInput
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </FormControl>
      <br />
      <br />
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {error && <FormHelperText error>Invalid username or password</FormHelperText>}
      <br />
      <br />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default AuthenticationPage;
