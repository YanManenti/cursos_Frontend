import { createError, eventHandler, readBody } from "h3";

export default eventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const body = await readBody(event);

  if (!body.refreshToken) {
    throw createError({
      statusCode: 403,
      data: {
        detail: "No refresh token provided",
      },
    });
  }

  const resData = await $fetch(
    `${runtimeConfig.app.apiUrl}/api/users/refresh`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${body.refreshToken}`,
      },
      method: "POST",
      withCredentials: true,
      credentials: "include",
    }
  )
    .then(async (res: any) => res)
    .catch((err: any) => {
      throw createError({
        statusCode: 401,
        data: {
          detail: err.message,
        },
      });
    });

  return {
    token: {
      accessToken: resData.access_token,
      refreshToken: resData.refresh_token,
    },
  };
});
