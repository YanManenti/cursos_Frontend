import { createError, eventHandler, readBody } from "h3";
import { z } from "zod";
import { sign } from "jsonwebtoken";

const refreshTokens: Record<number, Record<string, any>> = {};
export const SECRET = "secret";

export default eventHandler(async (event) => {
  const regex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
  const result = z
    .object({
      username: z.string().min(3).max(10),
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

  const expiresIn = "7d";
  const refreshToken =
    Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1;
  const { username, email } = result.data;
  const user = {
    username,
    email,
    avatar: "https://github.com/nuxt.png",
  };

  const accessToken = sign({ ...user, scope: "user" }, SECRET, {
    expiresIn,
  });
  refreshTokens[refreshToken] = {
    accessToken,
    user,
  };

  return {
    token: {
      accessToken,
      refreshToken,
    },
  };
});
