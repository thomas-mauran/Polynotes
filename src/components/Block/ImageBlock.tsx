import { Button, Container, TextField, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';


export default function ImageBlock(props) {

  const [inputs, setInputs] = useState({
    textField: props.defaultValue,
    src: props.defaultValue,
    settingsOpen: props.settingsOpen
  });

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
    props.onChange(props.index, inputs.textField)
    props.onCloseSettings(props.index)
};
  if(inputs.settingsOpen){
    return (
        <Box sx={{ display: "flex" }}>
          <TextField name="textField" label="Url of the image" margin="none" variant="standard" value={inputs.textField} type="email" onChange={handleChange}>
            Image block
          </TextField>
          <IconButton onClick={handleClick} aria-label="delete" sx={{ padding: "0px", height: "30px", marginTop: "20px"}} >
            <AddBoxIcon fontSize="large"/>
          </IconButton>
        </Box>
      );
  }else{
    return (
        <Box sx={{ display: "flex" }}>
          <img src={inputs.src} alt={inputs.src} style={{maxWidth: "100%"}}/>
        </Box>
      );
  }
  
}
