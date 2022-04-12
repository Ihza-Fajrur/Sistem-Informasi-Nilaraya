import React from "react";
import "./background.scss";
export default function Background() {
  return (
    <div className="background-containt">
      <img
        src={`${process.env.PUBLIC_URL}/Background.png`}
        alt="background"
        height="100%"
        width="100%"
        position="fixed"
      />
    </div>
  );
}
