import serverConfig from "../_config/server.config";

export const fetchCurrentUser = async () => {
  const res = await fetch(`${serverConfig.backendHost}/api/current-user`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();

  if (res.ok) {
    return data;
  }
  else {
    console.error(data.error);
    return null;
  }
}