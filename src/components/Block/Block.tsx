import { Box, Menu, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import React from "react";

export default function Block(props) {
  const [state, setState] = useState({
    html: props.defaultValue,
  });
  const ref = React.createRef() as any;

  useEffect(() => {
    ref.current.focus();
  }, []);


  const handleKeyDown = (e: any) => {
    if (e.key === "/") {
      props.onSlash(true);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      props.onEnter('p');
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      props.onArrowUp(props.index);
    }  };

  const handleChange = (e: { target: { value: any } }) => {
    setState((prevState) => ({
      ...prevState,
      html: e.target.value,
    }));
    props.onChange(props.index, state.html)

  };

  const appendHtml = (blockType: string) => {
    let html = state.html;
    html += "<h1></h1>";
    setState((prevState) => ({
      ...prevState,
      html: html,
    }));
    console.log(html);
  };

  return (
      <ContentEditable className={props.className} innerRef={ref} html={state.html} onChange={handleChange} onKeyDown={handleKeyDown} />
  );
}
