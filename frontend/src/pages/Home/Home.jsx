import React, { useContext } from 'react'
import "./Home.css"
import Sidebar from '../../components/Sidebar/Sidebar'
import Chats from '../../components/Chats/Chats'
import Nochat from '../../components/Nochat/Nochat'
import { contextApi } from '../../context/Context'

const Home = () => {

  const { noChat } = useContext(contextApi);

  return (
    <div className='home-container'>
        <Sidebar />
        { noChat === false? <Chats /> : <Nochat />}
    </div>
  )
}

export default Home
