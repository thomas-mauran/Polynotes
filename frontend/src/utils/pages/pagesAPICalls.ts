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

export async function updatePage(blocks: [], pageId: string | null, slashMenuBlockId: string | null, childList: []) {
  console.log(blocks);
  console.log(pageId);
  console.log(slashMenuBlockId);
  console.log(childList);

  const body = {
    pageId,
    update: {
      blocks,
      slashMenuBlockId,
      childList,
    },
  };

  const endpoint = `${endpointBase}/`;
  return await sendAPICall("PATCH", endpoint, body);
}
