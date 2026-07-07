import jwt from "jsonwebtoken";
import "dotenv/config";
import { userModel } from "../models/user.model.js";
import {
  generateAcccessToken,
  generateRefreshToken,
} from "../utils/tokenService.js";

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const isExists = await userModel.findOne({
    email,
  });
  if (isExists) {
    return res.status(409).json({
      message: "user already exists",
    });
  }
  const user = await userModel.create({ name, email, password });

  const accessToken = await generateAcccessToken(user._id);
  const refreshToken = await generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    message: "user registered succesfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const isUserExists = await userModel.findOne({ email }).select("+password");
  if (!isUserExists) {
    return res.status(404).json({
      message: "Invalid email or password",
    });
  }
  const isPasswordValid = await isUserExists.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
  const accessToken = await generateAcccessToken(isUserExists._id);
  const refreshToken = await generateRefreshToken(isUserExists._id);

  isUserExists.refreshToken = refreshToken;
  await isUserExists.save({ validateBeforeSave: false });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "user logged in succesfully",
    user: {
      id: isUserExists._id,
      name: isUserExists.name,
      email: isUserExists.email,
    },
  });
};

export const generateAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(404).json({
      message: "Invalid refresh token",
    });
  }
  let decode;
  try {
    decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }

  let user = await userModel.findById(decode.id);

  if (refreshToken !== user.refreshToken) {
    throw new Error("unasuthorized");
  }

  let accessToken = await generateAcccessToken(user._id);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
  });

  res.status(200).json({
    message: "access token generated",
  });
};
