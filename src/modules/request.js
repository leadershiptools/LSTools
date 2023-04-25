export async function get(path, params) {
  const baseUrl = "https://leadership-tools-backend.fly.dev";
  const formattedParams = params
    ? Object.entries(params)
        .map(([key, val]) => `${key}=${val}`)
        .join("&")
    : "";

  const request = await fetch(`${baseUrl}${path}?${formattedParams}`);
  const result = await request.json();
  return result;
}
