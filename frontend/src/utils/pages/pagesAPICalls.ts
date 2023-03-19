import { sendAPICall } from "../APICalls";

const endpointBase = "pages";

export async function getPage(pageId: string | undefined) {
  const body = {
    pageId,
  };

  const endpoint = `${endpointBase}/`;
  return await sendAPICall("POST", endpoint, body);
}

export async function updatePage(pageId: string | null, blocks: Object, slashMenuBlockId: string | null, childList: []) {
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
