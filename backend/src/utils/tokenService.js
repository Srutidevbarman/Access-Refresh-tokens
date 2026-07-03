import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateAcccessToken = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
};

export const generateRefreshToken = (userId) => {
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET,
  );
  return refreshToken;
};
