import { createError, eventHandler, readBody } from "h3";

export default eventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.refreshToken) {
    throw createError({
      statusCode: 403,
    });
  }

  const resData = await $fetch(`${process.env.AUTH_ORIGIN}/refresh`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${body.refreshToken}`,
    },
    method: "POST",
    withCredentials: true,
    credentials: "include",
  })
    .then(async (res: any) => res)
    .catch((err: any) => {
      throw err;
    });

  return {
    token: {
      accessToken: resData.access_token,
      refreshToken: resData.refresh_token,
    },
  };
});
