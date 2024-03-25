import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("uuid")) navigate("/login");
      else navigate("/dots");
    }, 1000);
  });
  return <div>Redirecting you to HQ</div>;
}
