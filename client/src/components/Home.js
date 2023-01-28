import React, { useState, useEffect } from "react";
import image from "../images/image.jpg";


const Home = () => {
  const [userName, setUserName] = useState("");
  // const [show, setshow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      // setshow(true)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <>
      <div className="Home-page d-flex justify-content-center align-items-center">
        <div className="home-div">
          {/* <p className="pt-5 text-center">WELCOME</p> */}
          <p className="home_page_hello">HE</p>
          <p className="home_page_hello">LLO.</p>
          {/* <h1 className="text-center">{userName ? userName : "We Are The MERN Developer"}</h1> */}
          <p className="text-center happy">{userName ? `Happy, to see you back ${userName}` : ""}</p>
        </div>
        <div className="home_page_img">
          <img src={image} alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
