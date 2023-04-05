// MUI
import { Box, Container, IconButton, Menu, MenuItem, Popover, Typography } from "@mui/material";

// Style
import styled from "@emotion/styled";
import { useRef, useState, MouseEvent, useEffect } from "react";

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
import { addBlock, closeHelper, createMultiColumn, deleteBlock, openSettings, setPageContent } from "../../redux/reducers/pageReducer";
import GifPickerBlock from "../../components/Block/GifPickerBlock";
import { setAutoFreeze } from "immer";
import { RootState } from "../../redux/store";
import { useParams } from "react-router";
import { findPage } from "../../utils/pages/pagesAPICalls";
import { BlockType, BoardData, SupageHTML } from "../../types/PageTypes";
import SubPage from "../../components/Block/SubpageBlock";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import IosShareIcon from "@mui/icons-material/IosShare";

const MainBox = styled.div(`
width: 100%;
min-width: 200px;
margin: 5% 15% 5% 10%;
`);

export default function PageView() {
  // HOOKs
  setAutoFreeze(false);
  const { id } = useParams();

  useEffect(() => {
    fetchPage(id);
  }, [id]);

  const blocks = useSelector((state: RootState) => state.pageReduc.blocks);
  const slashMenuBlockId = useSelector((state: RootState) => state.pageReduc.slashMenuBlockId);

  const dispatch = useDispatch();

  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  // FUNCTIONS
  const handleClickMenu = (e: MouseEvent) => {
    dispatch(addBlock({ blockType: (e.target as HTMLButtonElement).id, uuid: slashMenuBlockId }));
    dispatch(closeHelper());
  };

  const fetchPage = async (id: string | undefined) => {
    const page = await findPage(id);
    const { _id, blocks, childList, slashMenuBlockId } = page.data;
    dispatch(setPageContent({ pageId: _id, blocks, childList, slashMenuBlockId }));
  };

  const openSharePopOver = (e: MouseEvent) => {
    setShareMenuOpen(shareMenuOpen ? false : true);
  };

  const blockElements = blocks.map((item: BlockType, index: number) => {
    if (item.type === "img") {
      return (
        <Box className="line" key={item.id}>
          <Box className="lineOptions">
            <IconButton onClick={() => dispatch(deleteBlock({ uuid: item.id }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(openSettings({ uuid: item.id }))} aria-label="setting" sx={{ padding: "0px", height: "20px" }}>
              <SettingsIcon />
            </IconButton>
          </Box>
          <ImageBlock uuid={item.id} defaultValue={item.html as string} index={index} settingsOpen={item.settingsOpen as boolean} />
        </Box>
      );
    } else if (item.type === "trello" || item.type === "table") {
      return (
        <Box className="line" key={item.id}>
          <Box className="lineOptions">
            <IconButton onClick={() => dispatch(deleteBlock({ uuid: item.id }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(openSettings({ uuid: item.id }))} aria-label="setting" sx={{ padding: "0px", height: "20px" }}>
              <SettingsIcon />
            </IconButton>
          </Box>
          <DatabaseBlock uuid={item.id} dbType={item.type} defaultValue={item.html as BoardData} settingsOpen={item.settingsOpen as boolean} index={index} />
        </Box>
      );
    } else if (item.type === "gif") {
      return (
        <Box className="line" key={item.id}>
          <Box className="lineOptions">
            <IconButton onClick={() => dispatch(deleteBlock({ uuid: item.id }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(openSettings({ uuid: item.id }))} aria-label="setting" sx={{ padding: "0px", height: "20px" }}>
              <SettingsIcon />
            </IconButton>
          </Box>
          <GifPickerBlock uuid={item.id} defaultValue={item.html as string} index={index} settingsOpen={item.settingsOpen as boolean} />
        </Box>
      );
    } else if (item.type === "subpage") {
      return (
        <Box className="line" key={item.id}>
          <Box className="lineOptions">
            <IconButton onClick={() => dispatch(deleteBlock({ uuid: item.id }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(openSettings({ uuid: item.id }))} aria-label="setting" sx={{ padding: "0px", height: "20px" }}>
              <SettingsIcon />
            </IconButton>
          </Box>
          <SubPage uuid={item.id} defaultValue={item.html as SupageHTML} index={index} settingsOpen={item.settingsOpen as boolean} />
        </Box>
      );
    } else if (item.type === "multiCol") {
      return (
        <Box className="line" key={item.id}>
          <Box className="lineOptions">
            <IconButton onClick={() => dispatch(deleteBlock({ uuid: item.id }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(openSettings({ uuid: item.id }))} aria-label="setting" sx={{ padding: "0px", height: "20px" }}>
              <SettingsIcon />
            </IconButton>
          </Box>
          <MultiColumnBlock uuid={item.id} defaultValue={item.html as BlockType[][]} index={index} />
        </Box>
      );
    } else {
      return (
        <Box className="line" key={item.id}>
          <Box className="lineOptions">
            <IconButton onClick={() => dispatch(deleteBlock({ uuid: item.id }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(createMultiColumn({ index }))} aria-label="add" sx={{ padding: "0px", height: "20px" }}>
              <AddIcon />
            </IconButton>
          </Box>
          <TextBlock uuid={item.id} defaultValue={item.html as string} index={index} className={item.type} isFocused={item.focus} />
        </Box>
      );
    }
  });

  return (
    <Container fixed>
      <Box sx={{ position: "absolute", top: "0.4rem", right: "5rem" }}>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <IconButton aria-label="Share button"  {...bindTrigger(popupState)} sx={{ color: "black", width: "40px" }}>
                <IosShareIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}>
                <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
              </Popover>
            </div>
          )}
        </PopupState>
      </Box>
      <MainBox id="mainBlock">
        <Menu anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }} open={slashMenuBlockId !== null} onClose={() => dispatch(closeHelper())}>
          <MenuItem id="h1" onClick={handleClickMenu} key="h1">
            <img src="https://cdn-icons-png.flaticon.com/512/2800/2800015.png" alt="H1 block" className="menuImg" />
            <Typography variant="h5">h1</Typography>
          </MenuItem>
          <MenuItem id="h2" onClick={handleClickMenu} key="h2">
            <img src="https://cdn-icons-png.flaticon.com/512/2800/2800015.png" alt="H2 block" className="menuImg" />
            <Typography variant="h5">h2</Typography>
          </MenuItem>
          <MenuItem id="h3" onClick={handleClickMenu} key="h3">
            <img src="https://cdn-icons-png.flaticon.com/512/2800/2800015.png" alt="H3 block" className="menuImg" />
            <Typography variant="h5">h3</Typography>
          </MenuItem>
          <MenuItem id="p" onClick={handleClickMenu} key="p">
            <img src="https://cdn-icons-png.flaticon.com/512/2800/2800015.png" alt="Paragraph block" className="menuImg" />
            <Typography variant="h5">p</Typography>
          </MenuItem>
          <MenuItem id="subpage" onClick={handleClickMenu} key="Page">
            <img src="https://cdn-icons-png.flaticon.com/512/888/888034.png" alt="Link Block" className="menuImg" />
            <Typography variant="h5">Page</Typography>
          </MenuItem>
          <MenuItem id="trello" onClick={handleClickMenu} key="trello">
            <img src="https://cdn-icons-png.flaticon.com/512/2762/2762537.png" alt="Trello block" className="menuImg" />
            <Typography variant="h5">trello</Typography>
          </MenuItem>
          <MenuItem id="table" onClick={handleClickMenu} key="table">
            <img src="https://cdn-icons-png.flaticon.com/512/3602/3602111.png" alt="Table block" className="menuImg" />
            <Typography variant="h5">table</Typography>
          </MenuItem>
          <MenuItem id="img" onClick={handleClickMenu} key="img">
            <img src="https://cdn-icons-png.flaticon.com/512/5460/5460486.png" alt="Image block" className="menuImg" />
            <Typography variant="h5">img</Typography>
          </MenuItem>
          <MenuItem id="gif" onClick={handleClickMenu} key="gif">
            <img src="https://media.tenor.com/GIVLitDIxr8AAAAM/breaking-bad-walter-white.gif" alt="Gif Block" className="menuImg" />
            <Typography variant="h5">gif</Typography>
          </MenuItem>
        </Menu>
        {blockElements}
      </MainBox>
    </Container>
  );
}
