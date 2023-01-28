import React, { useEffect, useContext } from "react";//
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";//

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);//

  const navigate = useNavigate();
  //promises
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {

    localStorage.removeItem("state");

        console.log(res);
        dispatch({ type: "USER", payload: false });//

        navigate("/login", { replace: true });
        if (res.status != 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <h1> Logout ka page</h1>
    </>
  );
};

export default Logout;
