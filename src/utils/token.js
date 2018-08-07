import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SALT = "secretKey";
const REFRESH_TOKEN_SALT = "refreshSecretKey";

export function verifyAccessToken(jwtToken) {
  return jwt.verify(jwtToken, ACCESS_TOKEN_SALT);
}

export function verifyRefreshToken(jwtToken) {
  return jwt.verify(jwtToken, REFRESH_TOKEN_SALT);
}
