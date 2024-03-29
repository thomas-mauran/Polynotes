import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { StateType } from "../../types/PageTypes";
import { BlockType } from "../../types/PageTypes";
import { updatePage, updateRights } from "../../utils/pages/pagesAPICalls";

const initialState: StateType = {
  pageId: null,
  author: null,
  readRights: false,
  updateRights: false,
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
};

// setAutoFreeze(false);

const pageReducer = createSlice({
  name: "page",
  initialState,
  reducers: {

    setPageContent: (state, action) => {
      state.pageId = action.payload.pageId;
      state.author = action.payload.author;
      state.readRights = action.payload.readRights;
      state.updateRights = action.payload.updateRights;
      state.blocks = action.payload.blocks;
      state.slashMenuBlockId = action.payload.slashMenuBlockId;
    },



    addBlock: (state, action) => {
      const id = uuidv4();
      const id2 = uuidv4();

      // Database blocks
      if (action.payload.blockType === "trello" || action.payload.blockType === "table") {
        addItemAfterId(state.blocks, action.payload.uuid, { html: { lanes: [] }, type: action.payload.blockType, settingsOpen: false, id, focus: true });
        addItemAfterId(state.blocks, id, { html: "", type: "p", id: id2, focus: false });
      }

      // Link blocks
      else if (action.payload.blockType === "subpage") {
        addItemAfterId(state.blocks, action.payload.uuid, { html: "", type: "subpage", settingsOpen: true, id, focus: true });
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
      updateAfterId(state.blocks, action.payload.uuid, action.payload.newData);
      const blocksArray = JSON.parse(JSON.stringify(state.blocks));
      updatePage(blocksArray, state.pageId, state.slashMenuBlockId);
    },

    onArrowUp: (state, action) => {
      changeFocusWithArrow(state.blocks, action.payload.uuid, -1);
    },

    onArrowDown: (state, action) => {
      changeFocusWithArrow(state.blocks, action.payload.uuid, +1);
    },

    deleteBlock: (state, action) => {
      if (state.blocks.length > 1) {
        deleteItemAtId(state.blocks, action.payload.uuid);
      }
      const blocksArray = JSON.parse(JSON.stringify(state.blocks));
      updatePage(blocksArray, state.pageId, state.slashMenuBlockId);

    },
    openHelper: (state, action) => {
      state.slashMenuBlockId = action.payload.uuid;
    },

    closeHelper: (state) => {
      state.slashMenuBlockId = null;
    },
    openSettings: (state, action) => {
      const item = findItemById(state.blocks, action.payload.uuid);
      if (item) {
        item.item.settingsOpen = true;
      }    
    },
    closeSettings: (state, action) => {
      const item = findItemById(state.blocks, action.payload.uuid);
      if (item) {
        item.item.settingsOpen = false;
      }
    },

    changeType: (state, action) => {
      const item = findItemById(state.blocks, action.payload.uuid);
      if (item) {
        item.item.type = action.payload.newType;
      }
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

function findItemById(array: BlockType[], id: string): { item: BlockType; index: number; parentArray: BlockType[] } | null {
  // Iterate over the array given in argument
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item.id === id) {
      return { item, index: i, parentArray: array };
    }
    // If the block is a multicol we need to iterate over every element of its html data
    if (item.type === "multiCol") {
      const nestedItems: BlockType[][] = item.html as BlockType[][];
      for (let j = 0; j < nestedItems.length; j++) {
        // For each child we call findItemById recursively
        const found = findItemById(nestedItems[j], id);
        if (found) {
          return { ...found, parentArray: nestedItems[j] };
        }
      }
    }
  }
  return null;
}


function deleteItemAtId(array: BlockType[], id: string): BlockType[] {
  const found = findItemById(array, id);
  if (found) {
    const { item, index, parentArray } = found;
    parentArray.splice(index, 1);
  }

  return array;
}

function addItemAfterId(array: BlockType[], id: string, newItem: BlockType) {
  const found = findItemById(array, id);
  if (found) {
    const { item, index, parentArray } = found;
    // if the item.html is an array so we are in a multi col and need to run back addItemAfterId to search back the id
    // and add the block in the list after it

    parentArray[index].focus = false;
    parentArray.splice(index + 1, 0, newItem);
    parentArray[index + 1].focus = true;
  }
  return array;
}

function changeFocusWithArrow(array: BlockType[], id: string, direction: number) {
  const found = findItemById(array, id);
  if (found) {
    const { item, index, parentArray } = found;
    // if the item.html is an array so we are in a multi col and need to run back addItemAfterId to search back the id
    // and add the block in the list after it
    if (Array.isArray(item.html)) {
      const nestedItems: BlockType[][] = item.html as BlockType[][];
      for (let j = 0; j < nestedItems.length; j++) {
        // For each child we call findItemById recursively
        changeFocusWithArrow(item.html[j], id, direction);
      }
    } else {
      // we simply add the block after the found one
      if (parentArray[index + direction]) {
        parentArray[index].focus = false;
        parentArray[index + direction].focus = true;
      }
    }
  }
  return array;
}

function updateAfterId(array: BlockType[], id: string, newHtml: string) {
  const found = findItemById(array, id);
  if (found) {
    const { item, index, parentArray } = found;
    parentArray[index].html = newHtml;
  }
  return array;
}


export const { addBlock, updateHTML, createMultiColumn, setPageContent, onArrowUp, onArrowDown, changeType, deleteBlock, openHelper, closeHelper, closeSettings, openSettings } = pageReducer.actions;

export default pageReducer.reducer;
