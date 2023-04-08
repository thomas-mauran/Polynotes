import { sendAPICall } from "../APICalls";

const endpointBase = "pages";

export async function findPage(pageId: string | undefined) {
  const body = null;
  const endpoint = `${endpointBase}/${pageId}`;
  return await sendAPICall("GET", endpoint, body);
}

export async function updateRights(pageId: string | null, readRights: boolean, updateRights: boolean) {

  const body = {
    pageId,
    readRights,
    updateRights,
  };
  const endpoint = `${endpointBase}/updateRights`;
  return await sendAPICall("PATCH", endpoint, body);
}


export async function findOrCreate(pageId: string | undefined) {
  const body = {
    pageId,
    userId: localStorage.getItem("user_id"),
  };

  const endpoint = `${endpointBase}/findOrCreate`;
  return await sendAPICall("POST", endpoint, body);
}

export async function getPages(){
  const body = null;
  const endpoint = `${endpointBase}/findAll/${localStorage.getItem("user_id")}`;
  return await sendAPICall("GET", endpoint, body);
}

export async function getPageTitle(pageId: string){
  const body = null;
  const endpoint = `${endpointBase}/getTitle/${pageId}`;
  return await sendAPICall("GET", endpoint, body);
}

export async function createPage(title: string, parentId: string) {
  const body = {
    title,
    parentId,
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
