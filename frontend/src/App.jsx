import React from "react";
import { axiosInstance } from "./config/axiosInstance";

const App = () => {
  const getData = async () => {
    try {
      let res = await axiosInstance.get("/products");
      console.log("this is ui app =>", res);
    } catch (err) {
      console.log("error in api", err);
    }
  };
  getData();
  return <div>App</div>;
};

export default App;
