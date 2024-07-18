import { createError, eventHandler, getRequestHeader, H3Event } from "h3";

const ensureAuth = async (event: H3Event) => {
  const runtimeConfig = useRuntimeConfig();

  const authHeaderValue = getRequestHeader(event, "authorization");
  if (typeof authHeaderValue === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  try {
    const resData = await fetch(
      `http://${runtimeConfig.app.BACK_API}/api/users/me`,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${authHeaderValue}`,
        },
        method: "GET",
        credentials: "include",
      }
    )
      .then(async (res: any) => await res.json())

      .catch((err: any) => {
        throw createError({
          statusCode: 401,
          data: {
            detail: err.message,
          },
        });
      });

    return resData;
  } catch (error) {
    console.error("Login failed. Here's the raw error:", error);
    throw createError({
      statusCode: 403,
      data: {
        detail: "You must be logged in to access this endpoint",
      },
    });
  }
};

export default eventHandler(async (event) => {
  const user = await ensureAuth(event);
  return user;
});
