import React from "react";
import { useDispatch } from "react-redux";
import { addUser, isLoading, removeUser } from "../features/auth.slice";
import { axiosInstance } from "../config/axiosInstance";
const useAuth = () => {
  const dispatch = useDispatch();
  const handleLogin = async (data) => {
    dispatch(isLoading(true));
    try {
      const response = await axiosInstance.post("/api/auth/login", data);
      dispatch(addUser(response.data.user));
    } catch (error) {
      console.log("error in login", error);
    } finally {
      dispatch(isLoading(false));
    }
  };
  const handleRegister = async (data) => {
    dispatch(isLoading(true));
    try {
      const response = await axiosInstance.post("/api/auth/register", data);
      dispatch(addUser(response.data.user));
    } catch (error) {
      console.log("error in register", error);
    } finally {
      dispatch(isLoading(false));
    }
  };
  const handleGetUser = async () => {
    dispatch(isLoading(true));
    try {
      const response = await axiosInstance.get("/api/auth/me");
      dispatch(addUser(response?.data?.user));
    } catch (error) {
      dispatch(removeUser());
      console.log("error in get user", error);
    } finally {
      dispatch(isLoading(false));
    }
  };
  return { handleLogin, handleRegister, handleGetUser };
};

export default useAuth;
