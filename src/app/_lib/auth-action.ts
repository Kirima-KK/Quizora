import { LoginInfo } from "./definition";

import serverConfig from "../_config/server.config";

export async function handleLogin(data: LoginInfo) {
  const email = data.email;
  const password = data.password;

  const response = await fetch(`${serverConfig.backendHost}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    return response.json();
  } else {
    const data = await response.json();
    console.error(data.error);
  }
}

export async function logoutHandler() {
  const response = await fetch(`${serverConfig.backendHost}/api/logout`, {
    method: 'POST',
  });

  if (response.ok) {
    if (response.status === 204) {
      return { success: true };
    }

    return response.json();
  } else {
    const data = await response.json();
    console.error(data.error);
  }
}