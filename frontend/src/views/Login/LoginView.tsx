import { Button, Container, Divider, FormControl, FormHelperText, Input, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import catGif from "../../assets/gifs/catLogin.gif";
import LoginForm from "../../components/loginForm/LoginForm";

// Style
export default function LoginView() {
  const Box = styled.div`
    width: 80%;
    min-width: 200px;
    margin: 20% 10%;
  `;

  // Return
  return (
    <Container fixed sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <Container fixed sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
        <Box className="box">
          <img src={catGif} alt="Cat wondering image" style={{ width: "300px" }} />
        </Box>
        <Box className="box">
          <h1>Welcome back 👋</h1>
          <LoginForm />

          <Typography variant="subtitle1">
            <Link to="/signup">I don't have an account</Link>
          </Typography>
        </Box>
      </Container>
    </Container>
  );
}
