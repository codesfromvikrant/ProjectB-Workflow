import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.logged_in);
  const { uid } = JSON.parse(sessionStorage.getItem("user_data"));

  useEffect(() => {
    if (!uid) return navigate("/");
  }, [loggedIn, navigate]);

  return children;
};
export default Protected;