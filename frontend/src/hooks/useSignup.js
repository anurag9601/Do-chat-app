import { useContext, useState } from "react";
import { contextApi } from "../context/Context";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useContext(contextApi);

  const signup = async ({
    fullName,
    email,
    password,
    gender,
    confirmPassword,
  }) => {
    setLoading(true);

    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          gender,
          confirmPassword,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }

      //localstorage
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(JSON.stringify(data));
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
