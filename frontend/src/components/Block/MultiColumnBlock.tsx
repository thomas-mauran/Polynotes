import { Box } from "@mui/system";
import ImageBlock from "./ImageBlock";
import DatabaseBlock from "./DatabaseBlock";
import TextBlock from "./TextBlock";
import { useDispatch } from "react-redux";
import { deleteBlock, openSettings, updateHTML } from "../../redux/reducers/pageReducer";
import { IconButton } from "@mui/material";

// Delete line
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { BlockType, BoardData } from "../../types/PageTypes";
import GifPickerBlock from "./GifPickerBlock";

interface propsType {
  index: number;
  defaultValue: BlockType[][];
  uuid: string;
  isEditable: boolean;
}
export default function MultiColumnBlock(props: propsType) {
  const dispatch = useDispatch();

  const blocks = (columnId: number) => {
    const elements = props.defaultValue[columnId].map((item, index) => {
      if (item.type === "img") {
        return (
          <Box key={item.id}>
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
      }
      if (item.type === "gif") {
        return (
          <Box key={item.id}>
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
      } else if (item.type === "trello" || item.type === "table") {
        return (
          <Box key={item.id}>
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
      } else {
        return (
          <Box key={item.id}>
            <Box className="lineOptions">
              <IconButton onClick={() => dispatch(deleteBlock({ uuid: item.id }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <TextBlock uuid={item.id} defaultValue={item.html as string} index={index} className={item.type} isFocused={item.focus} isEditable={props.isEditable}/>
          </Box>
        );
      }
    });
    return elements;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "35%" }} className="multiColumn">
        {blocks(0)}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "35%" }} className="multiColumn">
        {blocks(1)}
      </Box>
    </Box>
  );
}
