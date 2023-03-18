export async function sendAPICall(method: string, endpoint: string, body: any) {
  const url = `${import.meta.env.VITE_APP_BASE_URL}/${endpoint}`;
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined, // Check if body is empty
  };
  const response = await fetch(url, options);

  try {
    const responseBody = await response.json();

    // If there is an error, we put a list of errors in the `message` field
    if (typeof responseBody.message === "string") {
      responseBody.message = [responseBody.message];
    }

    if (responseBody.error) {
      responseBody.message.push(responseBody.error);
    }

    console.log(responseBody);
    return responseBody;
  } catch (error) {
    return {
      code: response.status,
    };
  }
}
