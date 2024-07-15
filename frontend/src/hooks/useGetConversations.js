import { useEffect, useState } from "react"


const useGetConversations = () => {
    const [dataLoading , setDataLoading] = useState(false);
    const [conversation, setConversation] = useState([]);

    useEffect(()=>{

        const getConversation = async ()=>{
            setDataLoading(true);
            try {
                const res = await fetch('/auth/users');
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                };
                setConversation(data);
            } catch (err) {
                console.log(err.message)
            }finally{
                setDataLoading(false)
            }
        };

        getConversation();

    },[]);

    return { dataLoading , conversation};
}

export default useGetConversations
