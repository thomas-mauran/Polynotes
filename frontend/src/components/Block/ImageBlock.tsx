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

export default function ImageBlock(props: propsType) {
  const [inputs, setInputs] = useState({
    textField: props.defaultValue,
    src: props.defaultValue,
  });

  const dispatch = useDispatch();

  // Functions
  const handleChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      textField: e.target.value,
    }));
  };

  const handleClick = () => {
    setInputs((prevState) => ({
      ...prevState,
      src: prevState.textField,
    }));
    dispatch(closeSettings({ uuid: props.uuid }));

    dispatch(updateHTML({ uuid: props.uuid, newData: inputs.textField }));
  };
  return (
    <Box sx={{ display: "flex" }}>
      {props.settingsOpen === true ? (
        <>
          <TextField name="textField" label="Url of the image" margin="none" variant="standard" value={inputs.textField} type="email" onChange={handleChange}>
            Image block
          </TextField>
          <IconButton onClick={handleClick} aria-label="delete" sx={{ padding: "0px", height: "30px", marginTop: "20px" }}>
            <AddBoxIcon fontSize="large" />
          </IconButton>
        </>
      ) : (
        <img src={inputs.src} alt="Error ⚠️ : this is not an image link" style={{ maxWidth: "100%" }} />
      )}
    </Box>
  );
}
