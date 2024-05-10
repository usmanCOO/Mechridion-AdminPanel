import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Protected = ({ Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("accounts:accessToken");
    if (!login) {
      navigate("/login");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
