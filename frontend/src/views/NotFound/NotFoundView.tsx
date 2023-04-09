import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import errorCat from "../../assets/gifs/errorCat.gif"
import './style.css'
import Footer from "../../components/Footer/Footer";

export default function NotFoundView() {
  return (
    <Box  className='box'>
      <img src={errorCat} alt="404 not found gif" className="image"/>
      <h1>Seems like you got lost</h1>
      <Typography variant="h6" margin={"20px"}>
        Let's go back in the <Link to={'/workspace'} style={{textDecoration: "underline"}}>safe place</Link>
      </Typography>
      <Footer />
    </Box>
  );
}
