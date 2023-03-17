import { Alert, Button, Checkbox, Container, Divider, FormControl, FormControlLabel, FormHelperText, Input, InputLabel, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import SignupForm from "../../components/signupForm/SignupForm";

import catGif from "../../assets/gifs/catSignup.gif";
import { useState } from "react";

import { signup } from "../../utils/users/usersAPICalls";
// Style
export default function SignupView() {
  const Box = styled.div`
    width: 80%;
    min-width: 200px;
    margin: 20% 10%;
  `;
  // Hooks

  // Return
  return (
    <Container fixed sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <Container fixed sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
        <Box className="box">
          <h1>Signing up ? 🎉 </h1>
          <SignupForm />

          <Typography variant="subtitle1">
            <Link to="/login">I already have an account</Link>
          </Typography>
        </Box>
        <Box className="box">
          <img src={catGif} alt="Cat wondering image" />
        </Box>
      </Container>
      <Typography variant="caption">
        By clicking “Signup” above, you acknowledge that you have read and understood <br />{" "}
        <Link to="/cgu" style={{ textDecoration: "underline" }}>
          Polynote Terms and Conditions
        </Link>
      </Typography>
    </Container>
  );
}
