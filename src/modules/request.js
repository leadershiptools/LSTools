import Cookies from "js-cookie";

const baseUrl = "https://leadership-tools-backend.fly.dev";

function getUserToken() {
  const user = JSON.parse(Cookies.get("user") || "");
  if (user.idToken) return user?.idToken;
  window.location.href = "/";
  throw new Error("Authentication failed");
}

export async function get(path, params, isPublicUrl = false) {
  try {
    const formattedParams = params
      ? Object.entries(params)
          .map(([key, val]) => `${key}=${val}`)
          .join("&")
      : "";

    const request = await fetch(
      `${baseUrl}${path}?${formattedParams}`,
      !isPublicUrl
        ? {
            body: JSON.stringify({ idToken: getUserToken() }),
          }
        : {}
    );
    const result = await request.json();
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function patch(path, body, isPublicUrl = false) {
  try {
    const request = await fetch(`${baseUrl}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        ...(!isPublicUrl && { idToken: getUserToken() }),
      }),
    });
    const result = await request.json();
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function post(path, body, isPublicUrl = false) {
  try {
    const request = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        ...(!isPublicUrl && { idToken: getUserToken() }),
      }),
    });
    const result = await request.json();
    return result;
  } catch (error) {
    throw new Error(error);
  }
}
