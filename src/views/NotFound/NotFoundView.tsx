import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import './style.css'

export default function NotFoundView() {
  return (
    <Box  className='box'>
      <img src="https://media.giphy.com/avatars/404academy/kGwR3uDrUKPI.gif" alt="404 not found gif" className="image"/>
      <h1>Seems like you got lost</h1>
      <Typography variant="h6">
        Let's go back in the <Button component={Link} to={'/workspace'} variant={'contained'} color="secondary">safe place</Button>
      </Typography>
    </Box>
  );
}
