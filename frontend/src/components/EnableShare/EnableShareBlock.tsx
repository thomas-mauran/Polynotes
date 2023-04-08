import { Box, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Popover, Switch, Typography } from "@mui/material";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { IosShare } from "@mui/icons-material";
import "./style.css";
import { useEffect, useState } from "react";
import { updateRights } from "../../utils/pages/pagesAPICalls";

interface PropsType {
  pageId: string | null;
  readRights: boolean;
  updateRights: boolean;
}

export default function EnableShareBlock(props: PropsType) {
  console.log("rights", props.readRights, props.updateRights)
  const [state, setState] = useState({
    readRights: props.readRights,
    updateRights: props.updateRights,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, readRights: props.readRights, updateRights: props.updateRights }));
  }, [props.readRights, props.updateRights]);

  const handlePublicToggle = async () => {
    const newReadRights = !state.readRights; // toggle the readRights value
    let updateR = state.updateRights;
    if (newReadRights && state.updateRights) {
      updateR = false;
    }
    await updateRights(props.pageId, newReadRights, updateR); // update the database
    setState((prevState) => ({ updateRights: updateR , readRights: newReadRights }));
  };
  
  const handleUpdateToggle = async () => {
    const newUpdateRights = !state.updateRights; // toggle the updateRights value
    await updateRights(props.pageId, state.readRights, newUpdateRights); // update the database
    setState((prevState) => ({ ...prevState, updateRights: newUpdateRights }));
  };

  return (
    <Box sx={{ position: "absolute", top: "0.4rem", right: "5rem" }}>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>
            <IconButton aria-label="Share button" {...bindTrigger(popupState)} sx={{ color: "black", width: "40px" }}>
              <IosShare sx={{ fontSize: "2rem" }} />
            </IconButton>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "center",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "right",
              }}>
              <Box sx={{ textAlign: "center", display: "flex", alignItems: "center", flexDirection: "column", borderRadius: "0.5rem", fontWeight: "bold" }}>
                <FormGroup>
                  <FormControlLabel control={<Switch color="secondary" checked={state.readRights} onChange={handlePublicToggle} />} label="Share the file" labelPlacement="top" />
                  {state.readRights && <FormControlLabel control={<Switch color="secondary" checked={state.updateRights} onChange={handleUpdateToggle} />} label="Allow modifications" labelPlacement="top" />}
                </FormGroup>
              </Box>
            </Popover>
          </div>
        )}
      </PopupState>
    </Box>
  );
}
