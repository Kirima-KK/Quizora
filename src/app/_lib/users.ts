import { cookies, headers } from "next/headers";

export const fetchCurrentUser = async () => {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const baseUrl = `${protocol}://${host}`;
  const getCookie = async (name: string) => {
    return (await cookies()).get(name)?.value ?? '';
  }

  const cookie = await getCookie('session');
  const token = (await cookies()).get("session")?.value;
  const res = await fetch(`${baseUrl}/api/user`, {
    headers: {
      Cookie: `session=${cookie};`
    }
  });
  const data = await res.json();

  if (res.ok) {
    return data;
  }
  else {
    console.error(data.error);
  }
}