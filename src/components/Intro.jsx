import React, { useEffect, useRef, useState } from "react";

export default function Intro() {
  const [skipped, setSkipped] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setSkipped(true);
    }, 5000);
  }, []);

  const videoRef = useRef();
  const handleVideoEnd = () => {
    videoRef.current.currentTime = 2.4;
    videoRef.current.play();
  };
  return (
    <div
      className={`margin-auto absolute inset-0 z-50 opacity-100 transition-all duration-300 ${skipped ? "translate-y-[-800px]" : " "}`}
    >
      <video
        className="h-full w-full"
        src="/ciaLogo.mp4"
        autoPlay
        onEnded={handleVideoEnd}
        ref={videoRef}
        muted
      ></video>
    </div>
  );
}
