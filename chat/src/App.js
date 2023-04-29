import { useState,useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001/');

function App() {

  const [message,setMessage] = useState('');
  const [roomNum,setRoomNum] = useState('');
  const [showMessage,setShowMessage] = useState('');
  const sendMessage=()=>{
    socket.emit("send-message",{message,roomNum});
  }
  const sendRoomNum=()=>{
    if(roomNum !==""){
      socket.emit("join_room",roomNum);
    }
  }
useEffect(()=>{
socket.on("recieve_message",(data)=>{
  setShowMessage(data.message)
})
},[socket]);
  return (
    <div className="App">
      <input placeholder='Room Number...' onChange={(e)=> setRoomNum(e.target.value)}/>
     <button onClick={sendRoomNum}>Join Room</button><br/>
     <input placeholder='Message...' onChange={(e)=> setMessage(e.target.value)}/>
     <button onClick={sendMessage}>Send Message</button>
     <p>Message :</p>
     {showMessage}

    </div>
  );
}

export default App;
