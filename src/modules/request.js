import Cookies from "js-cookie";
import { getUserToken } from "./utils";

const baseUrl = "https://leadership-tools-backend.fly.dev";

function handleNotAuthorized() {
  Cookies.set("user", "");
  if (window.location.pathname.includes("LSTools")) {
    window.location.href = "/";
  }
  return;
}

export async function get(path, params, isPublicUrl = false) {
  try {
    const formattedParams = params
      ? Object.entries(params)
          .map(([key, val]) => `${key}=${val}`)
          .join("&")
      : "";
    const request = await fetch(`${baseUrl}${path}?${formattedParams}`, {
      headers: {
        "Content-Type": "application/json",
        ...(!isPublicUrl && { Authorization: `Bearer ${getUserToken()}` }),
      },
    });

    if (request.status === 401) {
      handleNotAuthorized();
      return;
    }

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
      headers: {
        "Content-Type": "application/json",
        ...(!isPublicUrl && { Authorization: `Bearer ${getUserToken()}` }),
      },
      body: JSON.stringify(body),
    });

    if (request.status === 401) {
      handleNotAuthorized();
      return;
    }

    const result = await request.json();
    return result;
  } catch (error) {
    handleNotAuthorized(error);
    throw new Error(error);
  }
}

export async function post(path, body, isPublicUrl = false) {
  try {
    const request = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(!isPublicUrl && { Authorization: `Bearer ${getUserToken()}` }),
      },
      body: JSON.stringify(body),
    });

    if (request.status === 401) {
      handleNotAuthorized();
      return;
    }

    const result = await request.json();
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function sendDelete(path, body, isPublicUrl = false) {
  try {
    const request = await fetch(`${baseUrl}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(!isPublicUrl && { Authorization: `Bearer ${getUserToken()}` }),
      },
      body: JSON.stringify(body),
    });

    if (request.status === 401) {
      handleNotAuthorized();
      return;
    }

    const result = await request.json();
    return result;
  } catch (error) {
    throw new Error(error);
  }
}
