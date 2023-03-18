import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useParams } from "react-router-dom";
export default function VerifyEmail() {
  const { email } = useParams();

  return (
    <Container fixed>
      <Box sx={{ margin: "100px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <img src="https://media.tenor.com/q-zZSTX6jSIAAAAM/mail-download.gif" alt="gif email" style={{ width: "300px" }} />
        <Typography variant="body1" gutterBottom>
          An email has been sent to this address {email} <br />
          Login{" "}
          <Link to={"/login"} style={{ textDecoration: "underline" }}>
            here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
