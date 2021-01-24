import React from "react";
import brain from "./brain-logo.png";
import Tilt from "react-tilt";
import "./Logo.css";

export const Logo = () => {
  return (
    <div className="ma4 mt4">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 35 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          <img style={{ paddingTop: "0.5rem" }} src={brain} alt="brain logo" />
        </div>
      </Tilt>
    </div>
  );
};
