// MUI
import { Box, Container, IconButton, Menu, MenuItem } from "@mui/material";

import { useImmer } from "use-immer";

// Style
import styled from "@emotion/styled";
import { useRef, useState, MouseEvent } from "react";

// Block components
import ImageBlock from "../../components/Block/ImageBlock";
import DatabaseBlock from "../../components/Block/DatabaseBlock";

// Delete line
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

// Draglines
import AddIcon from "@mui/icons-material/Add";
import "./blockStyle.css";
import "./style.css";
import TextBlock from "../../components/Block/TextBlock";

import MultiColumnBlock from "../../components/Block/MultiColumnBlock";

import { useSelector, useDispatch } from "react-redux";
import { addBlock, closeHelper, deleteBlock, openSettings } from "../../redux/blockReducer";

const MainBox = styled.div(`
width: 100%;
min-width: 200px;
margin: 5% 15% 5% 10%;
`);

export default function PageView() {

  const blocks = useSelector((state) => state.block.blocks);
  const helperOpen = useSelector((state) => state.block.helperOpen);
  const dispatch = useDispatch();

  const focusIndex = useRef(0);

  // Functions
  const handleClickMenu = (e: MouseEvent) => {
    dispatch(addBlock({ blockType: (e.target as HTMLButtonElement).id }));
    dispatch(closeHelper());
  };

  const blockElements = blocks.map((item, index) => {
    if (item.type === "img") {
      return (
        <Box className="draggableBox" key={item.id}>
          <Box className="lineOptions">
            <IconButton onClick={() => dispatch(deleteBlock({ index }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(openSettings({ index: index }))} aria-label="setting" sx={{ padding: "0px", height: "20px" }}>
              <SettingsIcon />
            </IconButton>
            {/* <IconButton onClick={() => dispatch({type: "DELETE_BLOCK", index: index})} aria-label="add" sx={{ padding: "0px", height: "20px" }}>
              <AddIcon />
            </IconButton> */}
          </Box>
          <ImageBlock defaultValue={item.html} index={index} settingsOpen={item.settingsOpen} />
        </Box>
      );
    } else if (item.type === "trello" || item.type === "table") {
      console.log("render", item.type)

      return (
        <Box className="draggableBox" key={item.id}>
          <Box className="lineOptions">
            <IconButton onClick={() => dispatch(deleteBlock({ index }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(openSettings({ index: index }))} aria-label="setting" sx={{ padding: "0px", height: "20px" }}>
              <SettingsIcon />
            </IconButton>
            {/*
            <IconButton onClick={() => handleCreateMultiBlock(index)} aria-label="add" sx={{ padding: "0px", height: "20px" }}>
              <AddIcon />
            </IconButton> */}
          </Box>
          <DatabaseBlock dbType={item.type} defaultValue={item.html} settingsOpen={item.settingsOpen} index={index} />
        </Box>
      );
    }
    // }else if (item.type === "multiColumn") {
    //   return (
    //     <Box className="draggableBox" key={item.id}>
    //       <Box className="lineOptions">
    //         <IconButton onClick={() => handleDeleteLine(index)} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
    //           <DeleteIcon />
    //         </IconButton>
    //         <IconButton onClick={() => handleCreateMultiBlock(index)} aria-label="add" sx={{ padding: "0px", height: "20px" }}>
    //           <AddIcon />
    //         </IconButton>{" "}
    //       </Box>
    //       <MultiColumnBlock defaultValue={item.html} onChange={handleUpdateHtml} index={index} />
    //     </Box>
    //   );
    // } else {
    return (
      <Box className="draggableBox" key={item.id}>
        <Box className="lineOptions">
          <IconButton onClick={() => dispatch(deleteBlock({ index }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
            <DeleteIcon />
          </IconButton>
          {/* <IconButton onClick={() => handleCreateMultiBlock(index)} aria-label="add" sx={{ padding: "0px", height: "20px" }}>
              <AddIcon />
            </IconButton> */}
        </Box>
        <TextBlock defaultValue={item.html} index={index} className={item.type} isFocused={item.focus} />
      </Box>
    );
  });

  return (
    <Container fixed>
      <MainBox id="mainBlock">
        <Menu anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }} open={helperOpen} onClose={() => dispatch(closeHelper())}>
          <MenuItem id="h1" onClick={handleClickMenu} key="h1">
            h1
          </MenuItem>
          <MenuItem id="h2" onClick={handleClickMenu} key="h2">
            h2
          </MenuItem>
          <MenuItem id="h3" onClick={handleClickMenu} key="h3">
            h3
          </MenuItem>
          <MenuItem id="p" onClick={handleClickMenu} key="p">
            paragraph
          </MenuItem>
          <MenuItem id="trello" onClick={handleClickMenu} key="trello">
            trello
          </MenuItem>
          <MenuItem id="img" onClick={handleClickMenu} key="img">
            image
          </MenuItem>
          <MenuItem id="table" onClick={handleClickMenu} key="table">
            table
          </MenuItem>
        </Menu>
        {blockElements}
      </MainBox>
    </Container>
  );
}
