import { sendAPICall } from "../APICalls";

const endpointBase = "folders";

export async function getTree() {
  const body = null;
  const userId = localStorage.getItem("user_id");
  const endpoint = `${endpointBase}/tree/${userId}`;
  return await sendAPICall("GET", endpoint, body);
}
