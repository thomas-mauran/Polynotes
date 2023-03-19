import { sendAPICall } from "../APICalls";

const endpointBase = "pages";

export async function getPage(pageId: string | undefined) {
  const body = {
    pageId,
  };

  const endpoint = `${endpointBase}/`;
  return await sendAPICall("POST", endpoint, body);
}

export async function update(state: Object) {
  const body = {};
  console.log(body);

  const endpoint = `${endpointBase}/`;
  return await sendAPICall("PATCH", endpoint, body);
}
