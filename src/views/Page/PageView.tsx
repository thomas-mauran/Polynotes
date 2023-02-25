import styled from "@emotion/styled";
import { Box, Container, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Block from "../../components/Block/Block";
import Draggable from "react-draggable";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import "./blockStyle.css";
import "./style.css";

export default function PageView() {
  // const blocks: any[] = ['test']

  const MainBox = styled.div`
    width: 100%%;
    min-width: 200px;
    margin: 5% 20%;
  `;

  const [blocks, setBlocks] = useState({
    list: [{ html: 'Press "/" to open the block menu', type: "p" }],
    focusIndex: 0,
  });

  // const [blockFocus, setBlockFocus] = useState(0)

  const [helperState, setHelperState] = useState({
    helperOpen: false,
    helperPosition: {
      top: 0,
      left: 0,
    },
  });

  // Functions
  const handleClickMenu = (e) => {
    handleCreateNewBlock(e.target.id);
    handleCloseMenu();
  };

  const handleOpenMenu = () => {
    console.log("test");
    setHelperState((prevState) => ({
      ...prevState,
      helperOpen: true,
    }));
  };

  const handleCloseMenu = () => {
    setHelperState((prevState) => ({
      ...prevState,
      helperOpen: false,
    }));
  };

  const handleCreateNewBlock = (blockType = "p") => {
    const newList = blocks.list
    newList.splice(blocks.focusIndex + 1 , 0, { html: "", type: blockType })
    setBlocks((prevState) => ({
      list: newList,
      focusIndex: prevState.focusIndex + 1,
    }));
  };

  const handleUpdateHtml = (index, html) => {
    // setBlockFocus((focus) => focus += 1)
    console.log(html);
    const newBlockList = blocks.list;
    newBlockList[index].html = html;
    console.log(newBlockList);

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
      console.log(blocks.focusIndex);
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

  const handleClickFocus = (index: number) => {
    setBlocks((prevState) => ({
      ...prevState,
      focusIndex: index,
    }));
  };

  const handleDeleteLine = (index: number) => {
    if (blocks.list.length > 1) {
      const newBlockList = blocks.list;
      newBlockList.splice(index, 1);

      setBlocks((prevState) => ({
        ...prevState,
        list: newBlockList,
      }));
    }
  };

  const blockElements = blocks.list.map((item, index) => {
    const isCurrentBlockFocused = index == blocks.focusIndex;
    if (isCurrentBlockFocused) {
      console.log(index);
    }
    return (
      // <Draggable axis="y" grid={[50, 45]}>
      <Box className="draggableBox">
        <Box className="lineOptions">
          <IconButton onClick={() => handleDeleteLine(index)} aria-label="delete" sx={{ padding: "0px" }}>
            <DeleteIcon />
          </IconButton>
          <DragIndicatorIcon />
        </Box>

        <Block
          key={index}
          defaultValue={item.html}
          onEnter={handleCreateNewBlock}
          onSlash={handleOpenMenu}
          index={index}
          onChange={handleUpdateHtml}
          onArrowUp={handleArrowUp}
          onArrowDown={handleArrowDown}
          className={item.type}
          isFocused={isCurrentBlockFocused}
          onClickFocus={handleClickFocus}></Block>
      </Box>
      // </Draggable> */}
    );
  });

  return (
    <Container fixed>
      <MainBox id="mainBlock" sx={{ margin: "20px 200px" }}>
        <Menu anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }} open={helperState.helperOpen} anchorPosition={helperState.helperPosition} onClose={handleCloseMenu}>
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
      </MainBox>
    </Container>
  );
}
