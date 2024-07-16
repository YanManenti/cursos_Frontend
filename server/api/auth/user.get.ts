import { createError, eventHandler, getRequestHeader, H3Event } from "h3";

const ensureAuth = async (event: H3Event) => {
  const authHeaderValue = getRequestHeader(event, "authorization");
  if (typeof authHeaderValue === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  try {
    const resData = await $fetch(`${process.env.AUTH_ORIGIN}/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authHeaderValue}`,
      },
      method: "GET",
      withCredentials: true,
      credentials: "include",
    })
      .then((res: any) => res)
      .catch((err: any) => {
        throw createError({
          statusCode: 401,
          statusMessage: err,
        });
      });

    return resData;
  } catch (error) {
    console.error("Login failed. Here's the raw error:", error);
    throw createError({
      statusCode: 403,
      statusMessage: "You must be logged in to use this endpoint",
    });
  }
};

export default eventHandler(async (event) => {
  const user = await ensureAuth(event);
  return user;
});
