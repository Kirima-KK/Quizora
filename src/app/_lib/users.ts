import { cookies } from "next/headers";
import serverConfig from "../_config/server.config";

export const fetchCurrentUser = async () => {
  const getCookie = async (name: string) => {
    return (await cookies()).get(name)?.value ?? '';
  }

  const cookie = await getCookie('session');
  const res = await fetch(`${serverConfig.backendHost}/api/current-user`, {
    method: 'GET',
    headers: {
      Cookie: `session=${cookie}`
    }
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