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
    .object({ username: z.string().min(3), password: z.string().regex(regex) })
    .safeParse(await readBody(event));
  if (!result.success) {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Unauthorized, password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    });
  }

  const expiresIn = "7d";
  const refreshToken =
    Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1;
  const { username } = result.data;
  const user = {
    username,
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
