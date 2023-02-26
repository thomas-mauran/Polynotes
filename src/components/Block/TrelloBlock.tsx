import { useCallback, useEffect, useState } from "react";
import Board from "react-trello";

export default function TrelloBlock(props) {


  const handleChange = useCallback((newData) => {
    if (JSON.stringify(newData) != JSON.stringify(props.defaultValue)){
        props.onChange(props.index, newData);
    }
  }, [props.onChange]);

  return (
    <Board
      key={props.index}
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
    //   onCardAdd={handleChange}
    //   onCardDelete={handleChange}
    //   onLaneAdd={handleChange}
      onDataChange={handleChange}
      canAddLanes
      // index={props.index}
    />
  );
}
