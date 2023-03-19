import { useSelector } from "react-redux";
import { RootState } from "../../types/ReduxTypes";
import { sendAPICall } from "../APICalls";

const endpointBase = "users";

export async function signup(username: string, email: string, password: string) {
  const body = {
    username,
    email,
    password,
  };

  const endpoint = `${endpointBase}/signup`;
  return await sendAPICall("POST", endpoint, body);
}

export async function login(email: string, password: string) {
  const body = {
    email,
    password,
  };

  const endpoint = `${endpointBase}/login`;
  return await sendAPICall("POST", endpoint, body);
}
