import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { StateType } from "../Types/PageTypes";

const initialState : StateType = {
  blocks: [
    { html: "", type: "p", id: uuidv4(), settingsOpen: true, focus: true },
  ],
  helperOpen: false,
  focusIndex: 0,
};

const blockReducer = createSlice({
  name: "block",
  initialState,
  reducers: {
    addBlock: (state, action) => {
      const id = uuidv4();
      const id2 = uuidv4();

      // Current focus index
      const index = state.focusIndex;

      // DatabaseBlock block
      if (action.payload.blockType === "trello" || action.payload.blockType === "table") {
        state.blocks[index].focus = false;
        state.blocks.splice(index + 1, 0, { html: { lanes: [] }, type: action.payload.blockType, settingsOpen: false, id, focus: true });
        state.blocks.splice(index + 2, 0, { html: "", type: "p", settingsOpen: false, id: id2, focus: false });
      }
      // Image blocks
      else if (action.payload.blockType === "img") {
        state.blocks[index].focus = false;
        state.blocks.splice(index + 1, 0, { html: "", type: "img", settingsOpen: true, id, focus: true });
        state.blocks.splice(index + 2, 0, { html: "", type: "p", settingsOpen: false, id: id2, focus: false });
      }
      // Text Blocks
      else {
        state.blocks[index].focus = false;
        state.blocks.splice(index + 1, 0, { html: "", type: action.payload.blockType, settingsOpen: false, id, focus: true });
      }
      // We increase the focusIndex since there's a new block in our state list
      state.focusIndex = index + 1;
    },

    updateHTML: (state, action) => {
      state.blocks[action.payload.index].html = action.payload.newData;
    },
    focusBlock: (state, action) => {
      state.focusIndex = action.payload.index;
    },

    onArrowUp: (state, action) => {
      if (state.focusIndex > 0) {
        state.blocks[action.payload.index].focus = false;
        state.blocks[action.payload.index - 1].focus = true;
        state.focusIndex -= 1;
      }
    },
    onArrowDown: (state, action) => {
      if (state.focusIndex < state.blocks.length - 1) {
        state.blocks[action.payload.index].focus = false;
        state.blocks[action.payload.index + 1].focus = true;
        state.focusIndex += 1;
      }
    },
    moveBlockDown: (state, action) => {
      if (action.payload.index < state.blocks.length - 1) {
        [state.blocks[action.payload.index], state.blocks[action.payload.index + 1]] = [state.blocks[action.payload.index + 1], state.blocks[action.payload.index]];
        state.focusIndex = action.payload.index + 1;
      }
    },
    deleteBlock: (state, action) => {
      console.log(action.payload.index);
      state.blocks.splice(action.payload.index, 1);
      state.focusIndex = action.payload.index === state.blocks.length ? action.payload.index - 1 : state.focusIndex;
    },
    openHelper: (state, action) => {
      state.helperOpen = true;
    },

    closeHelper: (state) => {
      state.helperOpen = false;
    },
    openSettings: (state, action) => {
      state.blocks[action.payload.index].settingsOpen = true;
    },
    closeSettings: (state, action) => {
      state.blocks[action.payload.index].settingsOpen = false;
    },

    changeType: (state, action) => {
      state.blocks[action.payload.index].type = action.payload.newType;
      console.log(state.blocks[action.payload.index].type)
    },
  },
});

export const { addBlock, updateHTML, focusBlock, onArrowUp, onArrowDown, moveBlockDown, changeType, deleteBlock, openHelper, closeHelper, closeSettings, openSettings } = blockReducer.actions;

export default blockReducer.reducer;
