import { sendAPICall } from "../APICalls";

const endpointBase = "pages";

export async function getPage(pageId: string | undefined) {
  const body = {
    pageId,
    userId: localStorage.getItem("user_id"),
  };

  const endpoint = `${endpointBase}/`;
  return await sendAPICall("POST", endpoint, body);
}

export async function updatePage(blocks: [], pageId: string | null, slashMenuBlockId: string | null) {
  const body = {
    pageId,
    update: {
      title: findElementInBlockList(blocks, ["h1"]),
      thumbnailSrc: findElementInBlockList(blocks, ["img", "gif"]),
      blocks,
      slashMenuBlockId,
    },
  };

  const endpoint = `${endpointBase}/`;
  return await sendAPICall("PATCH", endpoint, body);
}

export async function getRecentPages() {
  const body = null;
  const userId = localStorage.getItem("user_id");
  const endpoint = `${endpointBase}/recentDocuments/${userId}`;
  return await sendAPICall("GET", endpoint, body);
}

function findElementInBlockList(blockList: any[], type: string[]) {
  for (const block of blockList) {
    if (type.includes(block.type)) {
      let tempElement = document.createElement("div");
      tempElement.innerHTML = block.html as string;
      return tempElement.firstChild?.textContent;
    }
  }
  return null;
}
