import { KeyboardEvent, useEffect, useRef, useState } from "react";
import React from "react";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import IconButton from "@mui/material/IconButton";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CodeIcon from "@mui/icons-material/Code";
import "./style.css";
import { useDispatch } from "react-redux";
import { addBlock, onArrowUp, onArrowDown, updateHTML, openHelper, deleteBlock } from "../../redux/reducers/pageReducer";

interface propsType {
  index: number;
  defaultValue: string;
  uuid: string;
  isFocused: boolean;
  columnId?: number;
  onChangeMultiColumn?: (itemIndex: number, columnIndex: number, newData: string) => {};
  className: string;
}

export default function TextBlock(props: propsType) {
  const dispatch = useDispatch();

  const [state, setState] = useState(props.defaultValue);
  const ref = React.createRef() as any;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      // TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: props.defaultValue,
  });
  useEffect(() => {
    if (editor) {
      if (props.isFocused === true) {
        editor?.commands.focus();
      }
    }
  }, [editor, props.isFocused]);

  const handleKeyDown = (e: KeyboardEvent) => {
    // we update online if it's a text key
    if (e.code.startsWith("Key")) {
      updateParent();
    }
    if (e.key === "/" && editor?.isEmpty) {
      e.preventDefault();
      dispatch(openHelper({ uuid: props.uuid }));
    } else if (e.key === "Enter" && e.shiftKey) {
      editor?.commands.setContent(removeLastBr());
      dispatch(addBlock({ blockType: "p", columnIndex: props.columnId, itemIndex: props.index, uuid: props.uuid }));
    } else if (e.key === "ArrowUp") {
      dispatch(onArrowUp({ uuid: props.uuid }));
    } else if (e.key === "ArrowDown") {
      dispatch(onArrowDown({ uuid: props.uuid }));
    } else if (e.key === "Backspace" && editor?.isEmpty) {
        dispatch(deleteBlock({ uuid: props.uuid }));
    }
  };

  const removeLastBr = (): string => {
    const content = editor?.getHTML();
    const lastIndex = content?.lastIndexOf("<br>");

    if (lastIndex === undefined) {
      return content ?? "";
    } else {
      return `${content?.slice(0, lastIndex)}${content?.slice(lastIndex + 4)}`;
    }
  };


  const updateParent = (): void => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      if (props.onChangeMultiColumn) {
        props.onChangeMultiColumn(props.index, props.columnId as number, editor?.getHTML() ?? "");
      } else {
        dispatch(updateHTML({ uuid: props.uuid, newData: editor?.getHTML() }));
      }
    }, 100);
  };

  return (
    <div className={props.className}>
      <>
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="bubbleMenu">
            <IconButton onClick={() => editor?.chain().focus().toggleBold().run()}>
              <FormatBoldIcon />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().toggleItalic().run()}>
              <FormatItalicIcon />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().toggleStrike().run()}>
              <StrikethroughSIcon />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().toggleBulletList().run()}>
              <FormatListBulletedIcon />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
              <FormatListNumberedIcon />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>
              <CodeIcon />
            </IconButton>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} onKeyDown={handleKeyDown} className="editor" spellCheck="false" />
      </>
    </div>
  );
}
