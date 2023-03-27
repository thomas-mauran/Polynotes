import { Box } from "@mui/system";
import ImageBlock from "./ImageBlock";
import DatabaseBlock from "./DatabaseBlock";
import TextBlock from "./TextBlock";
import { useDispatch } from "react-redux";
import { deleteBlock, openSettings, updateBackend, updateHTML } from "../../redux/reducers/pageReducer";
import { IconButton } from "@mui/material";

// Delete line
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { BlockType, BoardData, TableData } from "../../types/PageTypes";
import produce from "immer";

type newDataType = string | BoardData;

interface propsType {
  index: number;
  defaultValue: BlockType[][];
  uuid: string;
}
export default function MultiColumnBlock(props: propsType) {
  const dispatch = useDispatch();

  const handleUpdateHtml = (itemIndex: number, columnIndex: number, newData: newDataType) => {
    const newHtml = produce(props.defaultValue, (draft) => {
      draft[columnIndex][itemIndex].html = newData;
    });
    dispatch(updateHTML({ uuid: props.uuid, newData: newHtml }));
  };

  const blocks = (columnId: number) => {
    const elements = props.defaultValue[columnId].map((item, index) => {
      if (item.type === "img") {
        return (
          <Box key={item.id}>
            <Box className="lineOptions">
              <IconButton onClick={() => dispatch(deleteBlock({ index }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => dispatch(openSettings({ index: index }))} aria-label="setting" sx={{ padding: "0px", height: "20px" }}>
                <SettingsIcon />
              </IconButton>
            </Box>
            <ImageBlock uuid={item.id} defaultValue={item.html as string} index={index} columnId={columnId} settingsOpen={item.settingsOpen as boolean} onChangeMultiColumn={handleUpdateHtml} />
          </Box>
        );
      } else if (item.type === "trello" || item.type === "table") {
        return (
          <Box key={item.id}>
            <Box className="lineOptions">
              <IconButton onClick={() => dispatch(deleteBlock({ index }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => dispatch(openSettings({ index: index }))} aria-label="setting" sx={{ padding: "0px", height: "20px" }}>
                <SettingsIcon />
              </IconButton>
            </Box>
            <DatabaseBlock uuid={item.id} dbType={item.type} defaultValue={item.html as BoardData} columnId={columnId} settingsOpen={item.settingsOpen as boolean} index={index} onChangeMultiColumn={handleUpdateHtml} />
          </Box>
        );
      } else {
        return (
          <Box key={item.id}>
            <Box className="lineOptions">
              <IconButton onClick={() => dispatch(deleteBlock({ index }))} aria-label="delete" sx={{ padding: "0px", height: "20px" }}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <TextBlock uuid={item.id} defaultValue={item.html as string} index={index} columnId={columnId} className={item.type} isFocused={item.focus} onChangeMultiColumn={handleUpdateHtml} />
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
