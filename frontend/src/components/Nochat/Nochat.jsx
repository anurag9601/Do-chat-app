import React from "react";
import "./Nochat.css";
import { LuMessagesSquare } from "react-icons/lu";

const Nochat = () => {
  return (
    <div className="nochat-container">
      <div className="nochat-message">
        <h1>
          Welcome 👋 Anurag Mishra ❄️
          <br /> Select a chat to start messaging
        </h1>
        <span>
          <LuMessagesSquare />
        </span>
      </div>
    </div>
  );
};

export default Nochat;
