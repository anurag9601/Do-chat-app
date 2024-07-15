import React, { useContext } from "react";
import "./Sidebar.css";
import { IoSearch } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import useLogout from "../../hooks/useLogout";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "../conversation/Conversation";

const Sidebar = () => {
  const { loading, logout } = useLogout();

  const { dataLoading, conversation } = useGetConversations();

  return (
    <div className="sidebar-container">
      <div className="sidebar-search-box">
        <input type="text" placeholder="Search" />
        <button type="button">
          <IoSearch />
        </button>
      </div>
      <div className="sidebar-users-list">
        {conversation.map((user) => (
          <Conversation key={user._id} user={user} />
        ))}
      </div>
      <div className="logout-btn">
        <span title="logout" onClick={logout}>
          <IoLogOut />
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
