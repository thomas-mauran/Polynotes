import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Board from "react-trello";

export default function DatabaseBlock(props) {
  useEffect(() => {
    console.log("default val", props.defaultValue);
  }, []);

  const handleChange = useCallback(
    (newData: any) => {
      console.log(newData);
      if (JSON.stringify(newData) != JSON.stringify(props.defaultValue)) {
        props.onChange(props.index, newData);
      }
    },
    [props.onChange]
  );

  const handleDbTypeChange = (e: SelectChangeEvent) => {
    props.changeType(props.index, e.target.value)
    props.onCloseSettings(props.index)

  }

  return (
    <Box sx={{ display: "flex" }}>
      {props.settingsOpen === true ? (
        <div>
          <Typography variant="h6">Type of database</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{props.dbType}</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select"  label="Age" onChange={handleDbTypeChange}>
              <MenuItem value={'trello'}>Trello</MenuItem>
              <MenuItem value={'table'}>Table</MenuItem>

            </Select>
          </FormControl>
        </div>
      ) : props.dbType === "trello" ? (
        <Board
          data={props.defaultValue}
          style={{
            backgroundColor: "transparent",
            padding: "30px 20px",
            height: "100%",
            fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
          }}
          draggable
          editable
          id="EditableBoard1"
          onDataChange={handleChange}
          canAddLanes
        />
      ) : (
        <h1>table</h1>
      )}
    </Box>
  );
}
