import styled from "@emotion/styled";
import { Box, Container, Menu, MenuItem } from "@mui/material";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Block from "../../components/Block/Block";

import "./blockStyle.css";

export default function PageView() {
  const Box = styled.div`
    width: 100%%;
    min-width: 200px;
    margin: 5% 20%;
  `;

  // const blocks: any[] = ['test']

  const [blocks, setBlocks] = useState({
    list: [{ html: 'Press "/" to open the block menu', type: "p" }],
    focusIndex: 0
  });

  // const [blockFocus, setBlockFocus] = useState(0)

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
  
  // useEffect(()=> {
  //   console.log("number has changed", blocks.focusIndex)
  // }, [blocks])

  // Functions
  const handleClickMenu = (e) => {
    handleCreateNewBlock(e.target.id);
    handleClose();
  };

  const handleOpen = () => {
    console.log("test");
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

  const handleCreateNewBlock = (blockType = "p") => {
    const newList = [...blocks.list, { html: "", type: blockType }];
    setBlocks((prevState) => ({
      list: newList,
      focusIndex: prevState.focusIndex + 1
    }));
  };

  const handleUpdateHtml = (index, html) => {
    // setBlockFocus((focus) => focus += 1)
    console.log(html)
    const newBlockList = blocks.list;
    newBlockList[index].html = html;
    console.log(newBlockList)

    setBlocks((prevState) => ({
      ...prevState,
      list: newBlockList,
    }));
  };

  const handleArrowUp = (index: number) => {
    if (index > 0) {
      setBlocks((prevState) => ({
        ...prevState,
        focusIndex: prevState.focusIndex - 1,
      }));
    }
  };

  const handleArrowDown = (index: number) => {
    if (index < blocks.list.length - 1) {
      setBlocks((prevState) => ({
        ...prevState,
        focusIndex: prevState.focusIndex + 1,
      }));
    }
  };

  const blockElements = blocks.list.map((item, index) => {
    const isCurrentBlockFocused = index == blocks.focusIndex;
    console.log(blocks.focusIndex);

    return <Block key={index} 
    defaultValue={item.html} 
    onEnter={handleCreateNewBlock} 
    onSlash={handleOpen} 
    index={index} 
    onChange={handleUpdateHtml} 
    onArrowUp={handleArrowUp} 
    onArrowDown={handleArrowDown} 
    className={item.type} 
    isFocused={isCurrentBlockFocused}></Block>;
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
