import React from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/auth.slice";
import { axiosInstance } from "../config/axiosInstance";
const useAuth = () => {
  const dispatch = useDispatch();
  const handleLogin = async (data) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", data);
      dispatch(addUser(response.data));
    } catch (error) {
      console.log("error in login", error);
    }
  };
  const handleRegister = async (data) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", data);
      dispatch(addUser(response.data.user));
    } catch (error) {
      console.log("error in register", error);
    }
  };
  return { handleLogin, handleRegister };
};

export default useAuth;
