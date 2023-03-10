import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Board from "react-trello";
import { ActiveTable } from "active-table-react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { changeType, closeSettings, updateHTML } from "../../redux/blockReducer";

export default function DatabaseBlock(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('newRender', props.dbType)
  }, [props.dbType])

  const handleChange = useCallback(
    (newData: any) => {
      if (props.dbType === "table") {
        console.log('export from db')
        newData = tableConvertExport(newData);
      }
      if (JSON.stringify(newData) != JSON.stringify(props.defaultValue)) {
        dispatch(updateHTML({ uuid: props.uuid, newData: newData }));
      }
    },
    [props.onChange, props.dbType]
  );

  const handleDbTypeChange = (e: SelectChangeEvent) => {
    console.log('newType', e.target.value)
    dispatch(closeSettings({ index: props.index }));
    dispatch(changeType({ index: props.index, newType:  e.target.value}));
  };

  const tableConvertExport = (content: any) => {
    if (content.length === 0) {
      return { lanes: [] };
    }

    const lanes = [];

    // create lane objects for each column
    for (let i = 0; i < content[0].length; i++) {
      const lane = {
        cards: [],
        id: uuidv4(),
        title: content[0][i],
        currentPage: 1,
      };
      lanes.push(lane);
    }
    // we remove the header line from the content to work only with data lines 
    content.shift()


    const tableMax = content.length
    const numberOfLanes = lanes.length;


    console.log('tabMax', tableMax)
    console.log('number of lanes ', numberOfLanes)

    // for each lane
    for (let i = 0; i < numberOfLanes; i++) {
      // and each card
      for (let j = 0; j < tableMax; j++) {
        if (content[j][i]) {
          const card = {
            id: uuidv4(),
            title: content[j][i],
            laneId: lanes[i].id,
          };
          lanes[i].cards.push(card);
        } else {
          const card = {
            id: uuidv4(),
            title: "",
            laneId: lanes[i].id,
          };
          lanes[i].cards.push(card);
        }
      }
    }

    const data = { lanes: lanes };
    console.log('export', data)
    return data;
  };

  const tableConvertImport = () => {
    const lanes = props.defaultValue.lanes;
    const table = [];
    const headerRow = [];
    if (lanes.length === 0) {
      return [["Click me"]];
    }
    // create header row
    for (let i = 0; i < lanes.length; i++) {
      headerRow.push(lanes[i].title);
    }
    table.push(headerRow);
    // // create data rows
    const headerLength = headerRow.length;
    const cardMax = cardMaxLength(lanes);
    for (let i = 0; i < cardMax; i++) {
      const dataRow = [];
      // const currentColumnLength = lanes[i].cards.length;
      for (let j = 0; j < headerLength; j++) {
        const card = lanes[j].cards[i];
        if (card) {
          dataRow.push(card.title);
        } else {
          dataRow.push("");
        }
      }
      table.push(dataRow);
    }
    console.log("import", table)
    return table;
  };

  // The goal of this function is to know what is the max cards length of a given lanes object
  const cardMaxLength = (lanes: any) => {
    let max = 0;
    for (let i = 0; i < lanes.length; i++) {
      if (lanes[i].cards) {
        if (lanes[i].cards.length > max) {
          max = lanes[i].cards.length;
        }
      }
    }
    return max;
  };

  // const tableMaxLength = (lines: any) => {
  //   let max = 0;
  //   for (let i = 0; i < lines.length; i++) {
  //       if (lines[i].length > max) {
  //         max = lines[i].length;
  //       }
  //   }
  //   return max;
  // };

  return (
    <Box sx={{ display: "flex" }}>
      {props.settingsOpen === true ? (
        <div>
          <Typography variant="h5">Change the data layout : </Typography>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{props.dbType}</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age" onChange={handleDbTypeChange}>
              <MenuItem value={"trello"}>Trello</MenuItem>
              <MenuItem value={"table"}>Table</MenuItem>
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
        <Box sx={{ display: "flex" }}>
          <ActiveTable content={tableConvertImport()} csvButtons={{ export: true }} headerStyles={{ default: { backgroundColor: "#d6d6d630" } }} onContentUpdate={handleChange} />
        </Box>
      )}
    </Box>
  );
}
