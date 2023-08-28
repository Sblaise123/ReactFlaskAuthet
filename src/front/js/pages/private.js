import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const token = sessionStorage.getItem("token");
  const handleClick = () => {
    actions.register(email, password);
  };
  useEffect(() => {
    if (!store.token) {
      history("/login");
    }
    if (store.token && store.token != "" && store.token != undefined)
      actions.getMessage();
  });
  return (
    <div className="text-center mt-5">
      <h1>You are now logged in as {store.message}</h1>
    </div>
  );
};