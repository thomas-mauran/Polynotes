import { Box, Menu, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import React from "react";

export default function Block() {
  const [state, setState] = useState({
    html: "Hello <i>World</i>",
    helperOpen: false,
    helperPosition: {
      top: 0,
      left: 2200,
    },
  });
  const ref = React.createRef() as any;

  useEffect(() => {
    const selection = window.getSelection();
    if (selection?.rangeCount !== 0) {
      const range = selection?.getRangeAt(0).cloneRange();
      range?.collapse(true);
      const rect = range?.getClientRects()[0];
      if (rect) {
        const left = rect.left ? rect.left : 0;
        const top = rect.top ? rect.top : 0;
        const newPos = {
          top: top,
          left: left,
        };
          setState((prevState) => ({
            ...prevState,
            helperPosition: newPos,}))
          
      }
    }
    console.log(state.helperPosition);
  }, [state.helperOpen]);

  const handleKeyUp = (e: any) => {
    if (e.key === "/") {
      setState((prevState) => ({
        ...prevState,
        helperOpen: true,
      }));
    }else if (e.key === " "){
      console.log('spacee')
    } 
    else {
      e.preventDefault()
      setState((prevState) => ({
        ...prevState,
        helperOpen: false,
      }));
    }
  };

  const handleChange = (e: { target: { value: any } }) => {
    setState((prevState) => ({
      ...prevState,
      html: e.target.value,
    }));
  };



  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      helperOpen: false,
    }));
  };

  return (
    <Box>
      <Menu anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }} open={state.helperOpen} anchorPosition={state.helperPosition} onClose={handleClose}>
          <MenuItem><Typography variant="h2">H1</Typography></MenuItem>
          <MenuItem><Typography variant="h3">H2</Typography></MenuItem>
          <MenuItem><Typography variant="h4">h3</Typography></MenuItem>
          <MenuItem><Typography variant="h6">normal text</Typography></MenuItem>
      </Menu>
      <ContentEditable innerRef={ref} html={state.html} onChange={handleChange} onKeyUp={handleKeyUp} style={{ fontSize: "1.3em" }} />
    </Box>
  );
}
