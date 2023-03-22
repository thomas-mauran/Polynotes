import decode from "jwt-decode";
import { useDispatch } from "react-redux";

export function login(username: string, email: string, jwt: string, user_id: string) {
  localStorage.setItem("AUTH_TOKEN_KEY", jwt);
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("user_id", user_id);
}

export function isLoggedIn() {
  let authToken = localStorage.getItem("AUTH_TOKEN_KEY");
  return authToken && !isTokenExpired(authToken);
}

function isTokenExpired(token: string): boolean {
  let expirationDate = getTokenExpirationDate(token);
  if (expirationDate !== null) {
    return expirationDate < new Date();
  }
  return true;
}

function getTokenExpirationDate(encodedToken: string): Date | null {
  let token: any = decode(encodedToken);
  if (!token.exp) {
    return null;
  }
  let date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}
