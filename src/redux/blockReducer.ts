import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { StateType } from "../Types/PageTypes";
import { setAutoFreeze } from "immer";
import { BlockType } from "../Types/PageTypes";

const initialState: StateType = {
  blocks: [
    {
      html: "",
      type: "p",
      id: uuidv4(),
      settingsOpen: true,
      focus: true,
    },
  ],
  slashMenuBlockId: null,
  focusIndex: 0,
};

// setAutoFreeze(false);

const blockReducer = createSlice({
  name: "block",
  initialState,
  reducers: {
    addBlock: (state, action) => {
      const id = uuidv4();
      const id2 = uuidv4();

      // Database blocks
      if (action.payload.blockType === "trello" || action.payload.blockType === "table") {
        addItemAfterId(state.blocks, action.payload.uuid, { html: { lanes: [] }, type: action.payload.blockType, settingsOpen: false, id, focus: true });
        addItemAfterId(state.blocks, id, { html: "", type: "p", id: id2, focus: false });
      }

      // Image blocks
      else if (action.payload.blockType === "img") {
        addItemAfterId(state.blocks, action.payload.uuid, { html: "", type: "img", settingsOpen: true, id, focus: true });
        addItemAfterId(state.blocks, id, { html: "", type: "p", id: id2, focus: false });
      }

      // Gif blocks
      else if (action.payload.blockType === "gif") {
        addItemAfterId(state.blocks, action.payload.uuid, { html: "", type: "gif", settingsOpen: true, id, focus: true });
        addItemAfterId(state.blocks, id, { html: "", type: "p", id: id2, focus: false });
      } else {
        addItemAfterId(state.blocks, action.payload.uuid, { html: "", type: action.payload.blockType, id: id2, focus: true });
      }

    },

    updateHTML: (state, action) => {
      updateAfterId(state.blocks, action.payload.uuid, action.payload.newData)
    },

    onArrowUp: (state, action) => {
      changeFocusWithArrow(state.blocks, action.payload.uuid, -1)
    },

    onArrowDown: (state, action) => {
      changeFocusWithArrow(state.blocks, action.payload.uuid, +1)
    },
    moveBlockDown: (state, action) => {
      if (action.payload.index < state.blocks.length - 1) {
        [state.blocks[action.payload.index], state.blocks[action.payload.index + 1]] = [state.blocks[action.payload.index + 1], state.blocks[action.payload.index]];
        state.focusIndex = action.payload.index + 1;
      }
    },
    deleteBlock: (state, action) => {
      if (state.blocks.length > 1) {
        state.blocks.splice(action.payload.index, 1);
        state.focusIndex = action.payload.index === state.blocks.length ? action.payload.index - 1 : state.focusIndex;
      }
    },
    openHelper: (state, action) => {
      state.slashMenuBlockId = action.payload.uuid;
    },

    closeHelper: (state) => {
      state.slashMenuBlockId = null;
    },
    openSettings: (state, action) => {
      state.blocks[action.payload.index].settingsOpen = true;
    },
    closeSettings: (state, action) => {
      state.blocks[action.payload.index].settingsOpen = false;
    },

    changeType: (state, action) => {
      state.blocks[action.payload.index].type = action.payload.newType;
      console.log(state.blocks[action.payload.index].type);
    },

    createMultiColumn: (state, action) => {
      const index = action.payload.index;
      const block = state.blocks[index];
    
      // Replace the current block with a multi-column block containing the original block
      state.blocks[index] = {
        html: [[block], [{ html: "", type: "p", id: uuidv4(), focus: false }]],
        type: "multiCol",
        id: uuidv4(),
        focus: false,
        settingsOpen: false,
      };
    
      // Add a new paragraph block after the multi-column block
      state.blocks.splice(index + 1, 0, {
        html: "",
        type: "p",
        id: uuidv4(),
        focus: false,
        settingsOpen: false,
      });
    },
    
  },
});

function findItemById(array: BlockType[], id: string): {item: BlockType, index: number, parentArray: BlockType[]} | null {
  // We itterate over the array given in argument
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item.id === id) {
      return { item, index: i, parentArray: array };
    }
    // If the block is a multicol we need to itterate over every element of it's html data
    if (item.type === "multiCol") {
      for (let j = 0; j < item.html.length; j++) {
        // for each child we run back findItemById recursively
        const nestedItems = item.html[j];
        const found = findItemById(nestedItems, id);
        if (found) {
          return { ...found, parentArray: nestedItems };
        }
      }
    }
  }
  return null;
}

function addItemAfterId(array: BlockType[], id: string, newItem: BlockType) {
  const found = findItemById(array, id);
  if (found) {
    const { item, index, parentArray } = found;
    // if the item.html is an array so we are in a multi col and need to run back addItemAfterId to search back the id
    // and add the block in the list after it
    if (Array.isArray(item.html)) {
      console.log('in')
      addItemAfterId(item.html, id, newItem);
    } else {
      // we simply add the block after the found one
      parentArray[index].focus = false
      parentArray.splice(index + 1, 0, newItem);
    }
  }
  return array;
}

function changeFocusWithArrow(array: BlockType[], id: string, direction: number){
    const found = findItemById(array, id);
    if (found) {
      const { item, index, parentArray } = found;
      // if the item.html is an array so we are in a multi col and need to run back addItemAfterId to search back the id
      // and add the block in the list after it
      if (Array.isArray(item.html)) {
        changeFocusWithArrow(item.html, id, direction);
      } else {
        // we simply add the block after the found one
        if( parentArray[index + direction]){
          parentArray[index].focus = false
          parentArray[index + direction].focus = true
        }
      }
    }
    return array;
}

function updateAfterId(array: BlockType[], id: string, newHtml: string) {
  const found = findItemById(array, id);
  if (found) {
    const { item, index, parentArray } = found;
    // if the item.html is an array so we are in a multi col and need to run back addItemAfterId to search back the id
    // and add the block in the list after it
    if (Array.isArray(item.html)) {
      addItemAfterId(item.html, id, newHtml);
    } else {
      // we simply add the block after the found one
      parentArray[index].html = newHtml
    }
  }
  return array;
}

export const { addBlock, updateHTML, createMultiColumn, onArrowUp, onArrowDown, moveBlockDown, changeType, deleteBlock, openHelper, closeHelper, closeSettings, openSettings } = blockReducer.actions;

export default blockReducer.reducer;
