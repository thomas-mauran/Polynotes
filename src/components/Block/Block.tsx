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
    if(props.isFocused){
      const element = ref.current
      element.focus()

      // we put the carret at the end
      const range = document.createRange();
      const selection = window.getSelection();

      range.selectNodeContents(element);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, []);


  const handleKeyDown = (e: any) => {
    if (e.key === "/") {
      e.preventDefault()
      props.onSlash(true);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      props.onEnter('p');
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      props.onArrowUp(props.index);
    }  
    if (e.key === "ArrowDown") {
      e.preventDefault();
      props.onArrowDown(props.index);
    }
  };

  const handleChange = (e: { target: { value: any } }) => {
    console.log()
    setState((prevState) => ({
      ...prevState,
      html: e.target.value,
    }));
    console.log(state.html)
    props.onChange(props.index, e.target.value)

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
