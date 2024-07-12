import { createError, eventHandler, readBody } from "h3";
import { z } from "zod";
import { sign } from "jsonwebtoken";

export const SECRET = "PKfXtTlvT/CimBILzFqfC7ftRZGxi23Ub0r6mbG81+0=";

export default eventHandler(async (event) => {
  const regex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
  const result = z
    .object({
      email: z.string().email(),
      password: z.string().regex(regex),
    })
    .safeParse(await readBody(event));

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw createError({
      statusCode: 403,
      statusMessage: `Invalid input. Please provide a valid username, email and password. Errors: ${errors.join(
        ", "
      )}.`,
    });
  }

  const resData = await fetch(`${process.env.AUTH_ORIGIN}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: result.data.email,
      password: result.data.password,
    }),
  })
    .then(async (res: any) => await res.json())
    .catch((err: any) => {
      throw createError({
        statusCode: 401,
        statusMessage: err,
      });
    });

  return {
    token: {
      accessToken: resData.access_token,
      refreshToken: resData.refresh_token,
    },
  };
});
