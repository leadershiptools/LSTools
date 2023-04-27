const baseUrl = "https://leadership-tools-backend.fly.dev";

export async function get(path, params) {
  try {
    const formattedParams = params
      ? Object.entries(params)
          .map(([key, val]) => `${key}=${val}`)
          .join("&")
      : "";

    const request = await fetch(`${baseUrl}${path}?${formattedParams}`);
    const result = await request.json();
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function patch(path, body) {
  try {
    const request = await fetch(`${baseUrl}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await request.json();
    return result;
  } catch (error) {
    throw new Error(error);
  }
}
