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

  const resData = await fetch(
    `http://${runtimeConfig.app.BACK_API}/api/users/refresh`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${body.refreshToken}`,
      },
      method: "POST",
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

  return {
    token: {
      accessToken: resData.access_token,
      refreshToken: resData.refresh_token,
    },
  };
});
