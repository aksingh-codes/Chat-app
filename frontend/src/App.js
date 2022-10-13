import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3000/");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([])

  const sendChat = e => {
    e.preventDefault()
    socket.emit("chat", {message})
    setMessage('')
  }

  useEffect(() => {
    socket.on("initialize", payload => {
      setChat(payload.chats)
    })
    socket.on("chat", payload => {
      setChat([...chat, payload])
    })
  })

  

  return (
    <div className="App">
      <h1>Chat Application</h1>
      {chat.map(chat => <p key={chat._id}>{chat.message}</p>)}
      <form onSubmit={sendChat}>
        <input value={message} onChange={e => setMessage(e.target.value)} type="text" name="chat" placeholder="send message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
