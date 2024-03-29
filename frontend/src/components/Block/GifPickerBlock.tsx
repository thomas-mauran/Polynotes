import { Button, Container, TextField, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { closeSettings, updateHTML } from "../../redux/reducers/pageReducer";
import { useDispatch } from "react-redux";

interface propsType {
  index: number;
  defaultValue: string;
  settingsOpen: boolean;
  uuid: string;
}

import GifPicker from "gif-picker-react";
export default function GifPickerBlock(props: propsType) {
  const [inputs, setInputs] = useState({
    textField: props.defaultValue,
    src: props.defaultValue,
  });

  const dispatch = useDispatch();

  // Functions

  const handleClick = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      src: e.preview.url,
    }));
    dispatch(closeSettings({ uuid: props.uuid }));

    dispatch(updateHTML({ uuid: props.uuid, newData: e.preview.url }));
  };
  return (
    <Box sx={{ display: "flex" }}>
      {props.settingsOpen === true ? (
        <>
          <GifPicker tenorApiKey={import.meta.env.VITE_APP_TENOR_API_KEY} onGifClick={handleClick} />
        </>
      ) : (
        <img src={inputs.src} alt={inputs.src} style={{ maxWidth: "100%" }} />
      )}
    </Box>
  );
}
