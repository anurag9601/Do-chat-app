import React, { useContext } from "react";
import { contextApi } from "../../context/Context";
import useConversation from "../../zustand/useConversation";

const Chatbox = ({ message }) => {
  const { authUser } = useContext(contextApi);
  const { selectedConversation } = useConversation();
  // console.log(selectedConversation)
  const fromMe = message.senderId === authUser.userInfo.id;
  const myChat = fromMe ? true : false;
  const profilePic = fromMe
    ? authUser.userInfo.porfilePic
    : selectedConversation.profilePic;
  return (
    <div className="chat-box">
      {myChat === true && (
        <div className="my-chat-bigbox">
          <div className="img-mychat">
            <img src={profilePic} alt="" />
            <div className="mychat">
              <p>{message.message}</p>
            </div>
          </div>
          <span>00:00</span>
        </div>
      )}
      {myChat === false && (
        <div className="otherchat-bigbox">
          <div className="img-otherchat">
            <img src={profilePic} alt="" />
            <div className="otherchat">
              <p>
                {message.message}
              </p>
            </div>
          </div>
          <span>00:00</span>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
