// MUI
import { Box, Container, IconButton, Menu, MenuItem } from "@mui/material";

import { useImmer } from "use-immer";

// Style
import styled from "@emotion/styled";
import { useCallback, useMemo, useRef, useState } from "react";

// Block components
import ImageBlock from "../../components/Block/ImageBlock";
import TrelloBlock from "../../components/Block/TrelloBlock";

// Delete line
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

// Draglines
import Draggable from "react-draggable";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import "./blockStyle.css";
import "./style.css";
import TextBlock from "../../components/Block/TextBlock";


const MainBox = styled.div(`
width: 100%;
min-width: 200px;
margin: 5% 15%;
`);

export default function PageView() {
  // const blocks: any[] = ['test']

  const [blocks, setBlocks] = useImmer({
    list: [{ html: "", type: "p", id: "1", focus: true }],
  });

  const focusIndex = useRef(0);

  // const [blockFocus, setBlockFocus] = useState(0)

  const [helperState, setHelperState] = useState({
    helperOpen: false,
    helperPosition: {
      top: 0,
      left: 0,
    },
  });

  // Functions
  const handleClickMenu = (e: any) => {
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


  // Function to create a newblock, by default a p
  // splited in multiple parts we check the type of the block we want to create and then 
  // splice the state block list at the current index to insert the block 
  const handleCreateNewBlock = (blockType = "p") => {
    const index = focusIndex.current 

    // Trello block
    if (blockType === "trello") {
      const id = Date.now().toString();
      const id2 = Date.now().toString();
      setBlocks((draft) => {
        draft.list[index].focus = false
        draft.list.splice(index + 1, 0, { html: { lanes: [] }, type: blockType, id, focus: true });
        draft.list.splice(index + 2, 0, { html: { lanes: [] }, type: "p", id2, focus: false });
      });
    } 
    // Image blocks
    else if (blockType === "img") {
      const id = Date.now().toString();
      const id2 = Date.now().toString();

      setBlocks((draft) => {
        draft.list[index].focus = false
        draft.list.splice(index + 1, 0, { html: "", type: "img", settingsOpen: true, id, focus: true });
        draft.list.splice(index + 2, 0, { html: "", type: "p", id2, focus: false });
      });
    } 
    // Text Blocks
    else {
      const id = Date.now().toString();
      setBlocks((draft) => {
        draft.list[index].focus = false
        draft.list.splice(index + 1, 0, { html: "", type: blockType, id, focus: true });
      });
    }
    // We increase the focusIndex since there's a new block in our state list 
    focusIndex.current += 1;
  };

  const handleUpdateHtml = (index: number, html: string) => {
    console.log('update', html)
    setBlocks((draft) => {
      draft.list[index].html = html;
    });
  };

  const handleClickFocus = (index: number) => {
    setBlocks((draft) => {
      draft.list[index].focus = false;
    });
    focusIndex.current = index;
  };

  const handleArrowUp = (index: number) => {
    if (index > 0) {
      setBlocks((draft) => {
        draft.list[index].focus = false;
        draft.list[index - 1].focus = true;
      });
      focusIndex.current -= 1;
    }
  };

  const handleArrowDown = (index: number) => {
    if (index < blocks.list.length - 1) {
      setBlocks((draft) => {
        draft.list[index].focus = false;
        draft.list[index + 1].focus = true;
      });
      focusIndex.current += 1;
    }
  };

  const handleDeleteLine = (index: number) => {
    if (blocks.list.length > 1) {
      setBlocks((draft) => {
        draft.splice(index, 1);
      });
    }
  };

  const handleOpenSettings = (index: number) => {
    setBlocks((draft) => {
      draft.list[index].settingsOpen = true;
    });
    console.log('open')
  };
  const handleCloseSettings = (index: number) => {
    setBlocks((draft) => {
      draft.list[index].settingsOpen = false;
    });
    console.log(blocks.list[index])
  };

  const blockElements = blocks.list.map((item, index) => {
    if (item.type === "img") {
      return (
        <Box className="draggableBox" key={item.id}>
          <Box className="lineOptions">
            <IconButton onClick={() => handleDeleteLine(index)} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleOpenSettings(index)} aria-label="setting" sx={{ padding: "0px", height: "20px" }}>
              <SettingsIcon />
            </IconButton>
            <DragIndicatorIcon />
          </Box>
          <ImageBlock defaultValue={item.html} index={index} key={item.id} onChange={handleUpdateHtml} settingsOpen={item.settingsOpen} onCloseSettings={handleCloseSettings} />
        </Box>
      );
    } else if (item.type === "trello") {
      return (
        <Box className="draggableBox" key={item.id}>
          <Box className="lineOptions">
            <IconButton onClick={() => handleDeleteLine(index)} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <DragIndicatorIcon />
          </Box>
          <TrelloBlock key={item.id} defaultValue={item.html} onChange={handleUpdateHtml} index={index} />
        </Box>
      );
    } else {
      return (
        <Box className="draggableBox" key={item.id}>
          <Box className="lineOptions">
            <IconButton onClick={() => handleDeleteLine(index)} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <DragIndicatorIcon />
          </Box>
          <TextBlock
            defaultValue={item.html}
            onEnter={handleCreateNewBlock}
            onSlash={handleOpenMenu}
            index={index}
            onChange={handleUpdateHtml}
            onArrowUp={handleArrowUp}
            onArrowDown={handleArrowDown}
            className={item.type}
            isFocused={item.focus}
            clickFocus={handleClickFocus}
          />
        </Box>
      );
    }
  });

  return (
    <Container fixed>
      <MainBox id="mainBlock">
        <Menu anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }} open={helperState.helperOpen} anchorPosition={helperState.helperPosition} onClose={handleCloseMenu}>
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
        </Menu>
        {blockElements}
      </MainBox>
    </Container>
  );
}
