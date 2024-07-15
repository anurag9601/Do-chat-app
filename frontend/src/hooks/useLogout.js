import { useContext, useState } from "react";
import { contextApi } from "../context/Context";

const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useContext(contextApi);

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/auth/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading , logout };
};

export default useLogout;
