import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./manifestoStyle.css";
import Card from "../../components/Manifesto/Card";

import page2 from "../../assets/png/manifesto/page2.png";
import page from "../../assets/png/manifesto/page.png";
import login from "../../assets/png/manifesto/login.png";
import signup from "../../assets/png/manifesto/signup.png";
import workspace from "../../assets/png/manifesto/workspace.png";


export default function Manifesto() {
  const [currentStyle, setCurrentStyle] = useState({});
  const [index, setIndex] = useState(0);

  const styles = [
    { fontFamily: "'Arvo', serif" },
    { fontFamily: "'Delicious Handrawn', cursive" },
    { fontFamily: "'Fugaz One', cursive" },
    { fontFamily: "'Jost', sans-serif" },
    { fontFamily: "'Permanent Marker', cursive" },
    { fontFamily: "'PT Serif', serif" },
    { fontFamily: "'Roboto', sans-serif" },
    { fontFamily: "'Rowdies', cursive" },
  ];

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

  // change the style every second
  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      setCurrentStyle(styles[index]);
      setIndex((index + 1) % styles.length);
    }, 1600);
    setTimeoutId(newTimeoutId);
  }, [currentStyle]);

  return (
    <Box className="box" sx={{ width: "100vw"}}>


      <Typography variant="h1" margin={"20px"} sx={currentStyle}>
        Polynotes
      </Typography>

      <Typography variant="h6" color="initial">
        A place to organize your thoughts and ideas.
      </Typography>
      <Box sx={{display: "flex", marginBottom: "100px"}}>
        <Button variant="contained" color="secondary" sx={{margin: "10px"}} onClick={() => {navigate("/login")}} >Login</Button>
        <Button variant="outlined" color="secondary"  sx={{margin: "10px"}} onClick={() => {navigate("/signup")}}>Signup</Button>
      </Box>
      <div data-aos="false">
        <Card title="Beautiful Login Forms" description="Discover stunning login forms that combine form and function to create a seamless user experience." imgSrc={login} isRight />
        <Card title="Innovative Sign-up Forms" description="Check out these creative sign-up forms that make onboarding a breeze for users." imgSrc={signup} />
        <Card title="Revolutionary Workspaces" description="Revamp your workspace with these cutting-edge design ideas that prioritize productivity and user engagement." imgSrc={workspace} isRight />
        <Card title="Note-Taking Made Easy" description="Upgrade your note-taking experience with these intuitive and user-friendly interfaces." imgSrc={page} />
        <Card title="Stunning Page Designs" description="Explore these visually stunning page designs that showcase the possibilities of web design." imgSrc={page2} isRight />
      </div>
    </Box>
  );
}
