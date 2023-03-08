// MUI
import { Box, Container, IconButton, Menu, MenuItem, Typography } from "@mui/material";

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

import TextFieldsIcon from "@mui/icons-material/TextFields";
// Draglines
import AddIcon from "@mui/icons-material/Add";
import "./blockStyle.css";
import "./style.css";
import TextBlock from "../../components/Block/TextBlock";

import MultiColumnBlock from "../../components/Block/MultiColumnBlock";

import { useSelector, useDispatch } from "react-redux";
import { addBlock, closeHelper, createMultiColumn, deleteBlock, openSettings } from "../../redux/blockReducer";
import GifPickerBlock from "../../components/Block/GifPickerBlock";

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
    } else if (item.type === "gif") {
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
          <GifPickerBlock defaultValue={item.html} index={index} settingsOpen={item.settingsOpen} />
        </Box>
      );
    } else if (item.type === "multiCol") {
      return (
        <Box className="draggableBox" key={item.id}>
          <Box className="lineOptions">
            <IconButton onClick={() => dispatch(deleteBlock({ index }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(openSettings({ index: index }))} aria-label="setting" sx={{ padding: "0px", height: "20px" }}>
              <SettingsIcon />
            </IconButton>
          </Box>
          <MultiColumnBlock defaultValue={item.html} index={index} />
        </Box>
      );
    } else {
      return (
        <Box className="draggableBox" key={item.id}>
          <Box className="lineOptions">
            <IconButton onClick={() => dispatch(deleteBlock({ index }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(createMultiColumn({ index }))} aria-label="add" sx={{ padding: "0px", height: "20px" }}>
              <AddIcon />
            </IconButton>
          </Box>
          <TextBlock defaultValue={item.html} index={index} className={item.type} isFocused={item.focus} />
        </Box>
      );
    }
  });

  return (
    <Container fixed>
      <MainBox id="mainBlock">
        <Menu anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }} open={helperOpen} onClose={() => dispatch(closeHelper())}>
          <MenuItem id="h1" onClick={handleClickMenu} key="h1">
            <img src="https://cdn-icons-png.flaticon.com/512/2800/2800015.png" alt="asdasds" className="menuImg" />
            <Typography variant="h5">h1</Typography>
          </MenuItem>
          <MenuItem id="h2" onClick={handleClickMenu} key="h2">
            <img src="https://cdn-icons-png.flaticon.com/512/2800/2800015.png" alt="asdasds" className="menuImg" />
            <Typography variant="h5">h2</Typography>
          </MenuItem>
          <MenuItem id="h3" onClick={handleClickMenu} key="h3">
            <img src="https://cdn-icons-png.flaticon.com/512/2800/2800015.png" alt="asdasds" className="menuImg" />
            <Typography variant="h5">h3</Typography>
          </MenuItem>
          <MenuItem id="p" onClick={handleClickMenu} key="p">
            <img src="https://cdn-icons-png.flaticon.com/512/2800/2800015.png" alt="asdasds" className="menuImg" />
            <Typography variant="h5">p</Typography>
          </MenuItem>
          <MenuItem id="trello" onClick={handleClickMenu} key="trello">
            <img src="https://cdn-icons-png.flaticon.com/512/2762/2762537.png" alt="asdasds" className="menuImg" />
            <Typography variant="h5">trello</Typography>
          </MenuItem>
          <MenuItem id="table" onClick={handleClickMenu} key="table">
            <img src="https://cdn-icons-png.flaticon.com/512/3602/3602111.png" alt="asdasds" className="menuImg" />
            <Typography variant="h5">table</Typography>
          </MenuItem>
          <MenuItem id="img" onClick={handleClickMenu} key="img">
            <img src="https://cdn-icons-png.flaticon.com/512/5460/5460486.png" alt="asdasds" className="menuImg" />
            <Typography variant="h5">img</Typography>
          </MenuItem>
          <MenuItem id="gif" onClick={handleClickMenu} key="gif">
            <img src="https://media.tenor.com/GIVLitDIxr8AAAAM/breaking-bad-walter-white.gif" alt="asdasds" className="menuImg" />
            <Typography variant="h5">gif</Typography>
          </MenuItem>
        </Menu>
        {blockElements}
      </MainBox>
    </Container>
  );
}
