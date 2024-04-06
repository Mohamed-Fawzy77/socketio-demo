export function validateTokenAndGetUserIdFromToken(token) {
  if (!token) {
    throw new Error("invalid token");
  }

  if (!token.startsWith("id")) {
    throw new Error("invalid token");
  }

  const [_, id] = token.split(":");
  return parseInt(id);
}
