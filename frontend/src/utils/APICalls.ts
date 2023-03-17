export async function sendAPICall(method: string, endpoint: string, body: any) {
  const url = `${import.meta.env.VITE_APP_BASE_URL}/${endpoint}`;
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined, // Check if body is empty
  };
  const response = await fetch(url, options);
  console.log(response);
  const responseBody = await response.json();
  if (typeof (responseBody.message === "string")) {
    responseBody.message = [responseBody.message];
  }
  console.log(responseBody);
  return responseBody;
}
