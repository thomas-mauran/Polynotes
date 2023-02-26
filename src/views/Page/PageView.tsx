// MUI
import { Box, Container, IconButton, Menu, MenuItem } from "@mui/material";

// Style
import styled from "@emotion/styled";
import { useState } from "react";

// Block components
import Block from "../../components/Block/Block";
import ImageBlock from "../../components/Block/ImageBlock";

import Board from "react-trello";
// Delete line
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

// Draglines
import Draggable from "react-draggable";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
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
    list: [
      { html: "Press / to open the block menu", type: "p" },
    ],
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
    const newList = blocks.list;
    let html = "";

    if (blockType === "trello") {
      html = { lanes: [] };
      newList.splice(blocks.focusIndex + 1, 0, { html: html, type: blockType });
      newList.splice(blocks.focusIndex + 2, 0, { html: "", type: "p" });
    }
    else if (blockType === "img") {
      html = { lanes: [] };
      newList.splice(blocks.focusIndex + 1, 0, { html: '', type: blockType, settingsOpen: true });
      newList.splice(blocks.focusIndex + 2, 0, { html: "", type: "p" });
    }
    else{
      newList.splice(blocks.focusIndex + 1, 0, { html: html, type: blockType });
    }


    setBlocks((prevState) => ({
      ...prevState,
      list: newList,
      focusIndex: prevState.focusIndex + 1,
    }));
  };

  const handleUpdateHtml = (index, html) => {
    // setBlockFocus((focus) => focus += 1)
    const newBlockList = blocks.list;
    newBlockList[index].html = html;

    setBlocks((prevState) => ({
      ...prevState,
      list: newBlockList,
    }));
    console.log(html);
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

  const handleOpenSettings = (index: number) => {
    const newBlockList = blocks.list;
    newBlockList[index].settingsOpen = true
    setBlocks((prevState) => ({
      ...prevState,
      list: newBlockList
    }));
  };
  const handleCloseSettings = (index: number) => {
    const newBlockList = blocks.list;
    newBlockList[index].settingsOpen = false
    setBlocks((prevState) => ({
      ...prevState,
      list: newBlockList
    }));
  };


  const blockElements = blocks.list.map((item, index) => {
    const isCurrentBlockFocused = index == blocks.focusIndex;

    if (item.type === "img") {
      // <Draggable axis="y" grid={[50, 45]}>
      return (
        <Box className="draggableBox">
          <Box className="lineOptions">
            <IconButton onClick={() => handleDeleteLine(index)} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleOpenSettings(index)} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <SettingsIcon />
            </IconButton>
            <DragIndicatorIcon />
          </Box>
          <ImageBlock defaultValue={item.html} index={index} key={index} onChange={handleUpdateHtml} settingsOpen={item.settingsOpen} onCloseSettings={handleCloseSettings}/>
        </Box>
      );
    } else if (item.type === "trello") {
      return (
        // <Draggable axis="y" grid={[50, 45]}>p

        <Box className="draggableBox">
          <Box className="lineOptions">
            <IconButton onClick={() => handleDeleteLine(index)} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <DragIndicatorIcon />
          </Box>
          <Board
            key={index}
            data={item.html}
            style={{
              backgroundColor: "transparent",
              padding: "30px 20px",
              height: "100%",
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            }}
            draggable
            editable
            id="EditableBoard1"
            onCardAdd={function noRefCheck() {}}
            onCardClick={function noRefCheck() {}}
            onCardDelete={function noRefCheck() {}}
            onDataChange={function noRefCheck() {}}
            canAddLanes
            index={index}
          />
        </Box>
        // </Draggable> */}
      );
    } else {
      return (
        // <Draggable axis="y" grid={[50, 45]}>
        <Box className="draggableBox">
          <Box className="lineOptions">
            <IconButton onClick={() => handleDeleteLine(index)} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
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
    }
  });

  return (
    <Container fixed>
      <MainBox id="mainBlock">
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
          <MenuItem id="trello" onClick={handleClickMenu}>
            trello
          </MenuItem>
          <MenuItem id="img" onClick={handleClickMenu}>
            image
          </MenuItem>
        </Menu>
        {/* <Block onEnter={handleCreateNewBlock}/> */}
        {blockElements}
      </MainBox>
    </Container>
  );
}
