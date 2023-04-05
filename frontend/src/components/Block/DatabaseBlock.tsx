import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
//@ts-ignore
import Board from "react-trello";
import { ActiveTable } from "active-table-react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { changeType, closeSettings, updateHTML } from "../../redux/reducers/pageReducer";
import { BoardData, Lane } from "../../types/PageTypes";

type dbTypes = "trello" | "table";

interface propsType {
  index: number;
  defaultValue: BoardData;
  settingsOpen: boolean;
  uuid: string;
  dbType: dbTypes;
  onChange?: () => {};
}

export default function DatabaseBlock(props: propsType) {
  const dispatch = useDispatch();

  useEffect(() => {}, [props.dbType]);

  const handleChange = useCallback(
    (newData: any) => {
      if (props.dbType === "table") {
        newData = tableConvertExport(newData);
      }
      if (JSON.stringify(newData) != JSON.stringify(props.defaultValue)) {
        dispatch(updateHTML({ uuid: props.uuid, newData: newData }));
      }
    },
    [props.dbType]
  );

  const handleDbTypeChange = (e: SelectChangeEvent) => {
    dispatch(closeSettings({ uuid: props.uuid }));
    dispatch(changeType({ uuid: props.uuid, newType: e.target.value }));
  };

  const tableConvertExport = (content: any) => {
    if (content.length === 0) {
      return { lanes: [] };
    }

    const lanes: Lane = [];

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
    content.shift();

    const tableMax = content.length;
    const numberOfLanes = lanes.length;

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
    return data;
  };

  const tableConvertImport = (): string => {
    const lanes = props.defaultValue.lanes;
    if (lanes.length === 0) {
      return '[["Click me"]]';
    } else {
      // Create header row
      const headerRow: string[] = lanes.map((lane) => (lane.title ? lane.title : ""));
      const table: (string | number)[][] = [headerRow];
  
      // Create data rows
      const headerLength = headerRow.length;
      const cardMax = cardMaxLength(lanes);
      for (let i = 0; i < cardMax; i++) {
        const dataRow: (string | number)[] = [];
        for (let j = 0; j < headerLength; j++) {
          const card = lanes[j].cards?.[i];
          if (card && card.title) {
            dataRow.push(card.title);
          } else {
            dataRow.push("");
          }
        }
        table.push(dataRow);
      }
      // Convert table to string ... sorry for that but I didn't find a better way to do it
      return table as unknown as string;
    }
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
          <ActiveTable content={tableConvertImport()} csvButtons={{ export: true }} headerStyles={{ default: { backgroundColor: "#d6d6d6" } }} onContentUpdate={handleChange} />
        </Box>
      )}
    </Box>
  );
}