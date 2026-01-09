import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './component/Header'
import Footer from './component/Footer'
import MainComponent from './component/MainComponent'
import {NameContext} from './context/NameContext'
import { useEffect } from 'react'
import { connectWS } from './ws'
import { useRef } from 'react'

function App() {
  const socket=useRef(null) //a var
  const [count, setCount] = useState(0)
  const [username, setUserName] = useState(null)
  const [message, setMessage] = useState([])
  const [typers,setTypers]= useState([])

  useEffect(()=>{
      socket.current=connectWS();

      socket.current.on("connect",()=>{
          socket.current.on("roomNotice",(userName)=>{
            alert(`${userName} joining the chat`);
            console.log(`${userName} joining the chat`);
          })

          socket.current.on('chatMessage',(msg)=>{
             console.log(msg);
             setMessage((prev)=>[...prev,msg])
          })
          socket.current.on('typing',(username)=>{
            setTypers((prev)=>{
              const isexist=prev.find((typer)=>typer===username);
              if(!isexist){
                return [...prev,username];
              }
              return prev;
            });
          });
          socket.current.on('stopTyping',(username)=>{
            setTypers((prev)=>prev.filter((typer)=>typer!==username));
          });
      });

      return () =>{
        socket.current.off('roomNotice');
        socket.current.off('chatMessage');
        socket.current.off('typing');
        socket.current.off('stopTyping');
      }
  },[]);


  return (
    <div className='h-screen p-8 flex flex-col bg-gray-200'>
      <NameContext.Provider value={{ username, setUserName }}>
        <Header typers={typers}/>
        <MainComponent socket={socket} message={message} setMessage={setMessage} />
        <Footer socket={socket} message={message} setMessage={setMessage} />
      </NameContext.Provider>
    </div>
  )
}

export default App
