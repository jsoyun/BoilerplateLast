import React, { useEffect } from "react";
import axios from "axios";
// import { response } from "express";

const LandingPage = () => {
  useEffect(() => {
    //get요청을 서버로 보낸다(index.js로)
    axios
      .get("http://localhost:5000/api/hello")
      .then((response) => console.log(response.data));
  }, []);
  return <div>LandingPage</div>;
};

export default LandingPage;
