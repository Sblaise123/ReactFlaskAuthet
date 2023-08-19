import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const token = sessionStorage.getItem("token");
  console.log("Your token: " + token);
  const handleClick = () => {
    actions.register(email, password);
  };
  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      history("/login");
  });
  return (
    <div className="text-center mt-5">
      <h1>Sign up!</h1>
      {store.token && store.token != "" && store.token != undefined ? (
        "You are now logged in with token " + token
      ) : (
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick}>submit</button>
        </div>
      )}
    </div>
  );
};
