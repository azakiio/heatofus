export default defineEventHandler((event) => {
  console.log("cors middleware");
  setResponseHeaders(event, {
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "*",
  });
  if (event.method === "OPTIONS") {
    console.log("preflight");
    setResponseStatus(event, 204, "No Content.");
    return "OK";
  }
});
