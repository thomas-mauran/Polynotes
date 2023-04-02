export async function sendAPICall(method: string, endpoint: string, body: any) {
  const { VITE_APP_BASE_URL } = await import.meta.env;
  let url;
  if(!VITE_APP_BASE_URL){
    // Meaning we are in production
    url = `/api/${endpoint}`;
  }else{
    url = `${VITE_APP_BASE_URL}/api/${endpoint}`;

  }
  console.log("url", url)

  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN_KEY")}` ?? undefined },
    body: body ? JSON.stringify(body) : undefined, // Check if body is empty
    credentials: "include",
  };
  const response = await fetch(url, options);
  let data;
  console.log(response)
  if (response.ok) {
    const responseText = await response.text();
    try{
      data = JSON.parse(responseText);
    }
    catch(error){
      data = responseText;
    }
  }

  try {
    const responseBody = await response.json();

    // If there is an error, we put a list of errors in the `message` field
    if (typeof responseBody.message === "string") {
      responseBody.message = [responseBody.message];
    }

    if (responseBody.error) {
      responseBody.message.push(responseBody.error);
    }
    return responseBody;
  } catch (error) {
    return {
      code: response.status,
      data,
    };
  }
}
