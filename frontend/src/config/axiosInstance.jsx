import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   (response) => {
//     console.log("axios instance request config =>", response);
//     // return response;
//   },
//   (error) => {
//     console.log("error in instance", error);
//   },
// );
