import { eventHandler } from "h3";

export default eventHandler(() => {
  return {
    status: 200,
    body: {
      message: "Logout successful",
    },
  };
});
