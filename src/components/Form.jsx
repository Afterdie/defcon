import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Form() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("uuid")) {
      console.log("user already exists");
      setTimeout(() => {
        navigate("/dots");
      }, 3000);
    }
  }, []);

  const [rollComplete, setRollComplete] = useState(false);
  const [factionSelected, setFactionSelected] = useState(false);
  const [factionComplete, setFactionComplete] = useState(false);
  const [formData, setFormData] = useState({
    roll: "",
    faction: "",
  });
  const handleRoll = (event) => {
    setFormData({ ...formData, roll: event.target.value });
  };
  const rollRef = useRef();
  const handleRollSubmit = () => {
    if (rollRef.current.value == "") return;
    setRollComplete(true);
  };
  const faction0 = useRef();
  const faction1 = useRef();
  const handleFactionSelect = (event) => {
    setFormData({
      ...formData,
      [event.currentTarget.getAttribute("data-name")]:
        event.currentTarget.getAttribute("data-value"),
    });
    setFactionSelected(true);
  };
  const handleFaction = (event) => {
    console.log("clicked");
    if (event.currentTarget.getAttribute("data-value") == "0") {
      faction0.current.play();
      faction1.current.pause();
      faction1.current.currentTime = 0;
    } else {
      faction1.current.play();
      faction0.current.pause();
      faction0.current.currentTime = 0;
    }
  };
  const handleSubmit = () => {
    if (!localStorage.getItem("uuid")) {
      console.log("generating a new user");
      localStorage.setItem(
        "uuid",
        JSON.stringify({
          uuid: uuidv4(),
          roll: formData.roll,
          faction: formData.faction,
        }),
      );
      //add code for redirecting
    }
  };
  const resetDebug = () => {
    setFactionComplete(false);
    setRollComplete(false);
    localStorage.removeItem("uuid");
  };
  return (
    <div className="relative h-[100vh] w-[100vw]">
      <div className="controls absolute top-0 z-50 bg-white ">
        <button onClick={resetDebug}>reset</button>
      </div>
      <section
        className={`margin-auto absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-black ${rollComplete ? "z-30 translate-y-[-800px] transition-all duration-300" : "z-40"}`}
      >
        <label htmlFor="" className="font-bold text-red-600">
          Enter your roll number Agent
        </label>
        <div className="group relative">
          <input
            type="text"
            onChange={handleRoll}
            maxLength={10}
            ref={rollRef}
            className="border-2 border-red-600 bg-transparent text-red-600 caret-transparent"
          />
          <div className="absolute bottom-2 left-2 h-[3px] w-[10px] animate-pulse bg-red-600 group-hover:hidden"></div>
          <button
            className="group absolute right-0 z-50 h-[100%] animate-pulse border-l-2 border-black bg-red-600 px-2"
            onClick={handleRollSubmit}
          >
            ➜
          </button>
        </div>
      </section>
      <section
        className={`margin-auto absolute inset-0 flex h-full w-full items-center justify-around bg-black ${factionComplete ? "z-20 translate-y-[-1000px] transition-all" : "z-30"}`}
      >
        <div
          onMouseOver={handleFaction}
          onClick={handleFactionSelect}
          data-value="0"
          data-name="faction"
        >
          <video loop muted ref={faction0} src="141anim.mp4"></video>
        </div>
        <div
          onMouseOver={handleFaction}
          onClick={handleFactionSelect}
          data-value="1"
          data-name="faction"
        >
          <video loop muted ref={faction1} src="141anim.mp4"></video>
        </div>
        <button
          className={`absolute bg-red-600 ${factionSelected ? "visible" : "hidden"}`}
          onClick={handleSubmit}
        >
          submit ➜
        </button>
      </section>
    </div>
  );
}
