import { useContext, useState } from 'react'
import { contextApi } from '../context/Context';

const useLogin = () => {
  const [loading , setLoading] = useState(false);

  const { setAuthUser } = useContext(contextApi);

  const login = async ( { email , password }) =>{

    setLoading(true)
    try {
        
        const res = await fetch("/auth/login", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ email , password }),
        })

        const data = await res.json();
        console.log(data)
        if(data.error){
            throw new Error(data.error);
        }

        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
    } catch (error) {
        console.log(error.message);
    }finally{
        setLoading(false)
    }
  };

  return { loading , login}
}

export default useLogin
