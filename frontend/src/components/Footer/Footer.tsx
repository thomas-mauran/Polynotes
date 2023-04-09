import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
      <Box sx={{bottom: "0", textAlign: "center", width: "100%" }}>
        <Typography variant="body1" color="text.primary" gutterBottom>
          Made with ❤️ by{" "}
          <Link to={"https://github.com/thomas-mauran"} style={{ textDecoration: "underline" }}>
            Thomas Mauran
          </Link>
        </Typography>
      </Box>
  );
}
