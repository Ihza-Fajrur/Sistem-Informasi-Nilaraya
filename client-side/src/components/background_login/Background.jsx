import React from "react";
import "./background.scss";
export default function Background() {
  return (
    <div className="background-containt">
      <img
        className="background"
        src={`${process.env.PUBLIC_URL}/Background.png`}
        alt="background"
      />
    </div>
  );
}
