import React from "react";
import Dots from "./components/Dots";
import Game1 from "./pages/Game1";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/dots" element={<Game1 />} />
    </Routes>
  );
}
