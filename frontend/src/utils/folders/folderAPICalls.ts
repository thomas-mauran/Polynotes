import { sendAPICall } from "../APICalls";

const endpointBase = "folders";

export async function createFolder(title: string, parentId: string, isRoot: boolean) {
  console.log("createFolder", title, parentId, isRoot);
  const body = {
    title,
    parentId,
    userId: localStorage.getItem("user_id"),
    isRoot,
  };
  const endpoint = `${endpointBase}/`;
  return await sendAPICall("POST", endpoint, body);
}
export async function getTree() {
  const body = null;
  const userId = localStorage.getItem("user_id");
  const endpoint = `${endpointBase}/tree/${userId}`;
  return await sendAPICall("GET", endpoint, body);
}
