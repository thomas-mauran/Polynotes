import styled from "@emotion/styled";
import { Box, Container, Menu, MenuItem } from "@mui/material";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Block from "../../components/Block/Block";

import './blockStyle.css'

export default function PageView() {
  const Box = styled.div`
    width: 100%%;
    min-width: 200px;
    margin: 5% 20%;
  `;


  // const blocks: any[] = ['test']

  const [blocks, setBlocks] = useState(
    [{html: 'asda', type: "p"}]
    );

  const [helperState, setHelperState] = useState({
    helperOpen: false,
    helperPosition: {
      top: 0,
      left: 0,
    },
  });


  // useEffect(() => {
  //   const selection = window.getSelection();
  //   if (selection?.rangeCount !== 0) {
  //     const range = selection?.getRangeAt(0).cloneRange();
  //     range?.collapse(true);
  //     const rect = range?.getClientRects()[0];
  //     if (rect) {
  //       const left = rect.left ? rect.left : 0;
  //       const top = rect.top ? rect.top : 0;
  //       const newPos = {
  //         top: top,
  //         left: left,
  //       };
  //       setHelperState((prevState) => ({
  //         ...prevState,
  //         helperPosition: newPos,
  //       }));
  //     }
  //   }
  // }, [helperState.helperOpen]);


  // Functions
  const handleClickMenu = (e) => {
    handleCreateNewBlock(e.target.id)
    handleClose()
  };

  const handleOpen = () => {
    setHelperState((prevState) => ({
      ...prevState,
      helperOpen: true,
    }));
  };

  const handleClose = () => {
    setHelperState((prevState) => ({
      ...prevState,
      helperOpen: false,
    }));
  };

  const handleCreateNewBlock = (blockType = 'p') => {
    const newList = [...blocks, {html: '', type: blockType}];
    setBlocks(newList);
  };

  const handleUpdateHtml = (index, html) => {
    console.log(index)
    const newBlockList = blocks
    newBlockList[index].html = html
    setBlocks(newBlockList);
  };

  const handleArrowUp = () =>{
    //todo
  }

  const blockElements = blocks.map((item, index) => {
    return <Block key={index} 
    defaultValue={item.html} 
    onEnter={handleCreateNewBlock} 
    onSlash={handleOpen} 
    index={index} 
    onChange={handleUpdateHtml}
    onArrowUp={handleArrowUp}
    className={item.type}
    ></Block>;
  });

  return (
    <Container fixed>
      <Box id="mainBlock">
        <Menu anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }} open={helperState.helperOpen} anchorPosition={helperState.helperPosition} onClose={handleClose}>
          <MenuItem id="h1" onClick={handleClickMenu}>
            h1
          </MenuItem>
          <MenuItem id="h2" onClick={handleClickMenu}>
            h2
          </MenuItem>
          <MenuItem id="h3" onClick={handleClickMenu}>
            h3
          </MenuItem>
          <MenuItem id="p" onClick={handleClickMenu}>
            paragraph
          </MenuItem>
        </Menu>
        {/* <Block onEnter={handleCreateNewBlock}/> */}
        {blockElements}
      </Box>
    </Container>
  );
}
