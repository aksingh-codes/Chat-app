import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import ChatEditor from "./components/ChatEditor";
import ChatViewer from "./components/ChatViewer";
import Navbar from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

const socket = io.connect(process.env.REACT_APP_SERVER_URL);

function App() {
  const [chat, setChat] = useState([]);
  const chatRef = useRef(null);
  const editorRef = useRef(null);

  const scrollChat = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
    const lastChild = chatRef.current.lastChild;
    lastChild.scrollIntoView();
  };

  
  useEffect(() => {
    socket.on("initialize", (payload) => {
      setChat(payload.chats);
      scrollChat();
    });

    socket.on("chat", (payload) => {
      console.log(payload);
      setChat([...chat, payload]);
    });
    
    editorRef &&
    (chatRef.current.style.marginBottom = `${
      parseInt(editorRef.current.clientHeight) + 24
    }px`);
    
    window.addEventListener("resize", () => {
      editorRef &&
        (chatRef.current.style.marginBottom = `${
          parseInt(editorRef.current.clientHeight) + 24
        }px`);
      chat.length > 0 && scrollChat();
    });
  });

  useEffect(() => {
    chat.length > 0 && scrollChat();
    console.log("chat scroll");
  }, [chat]);

  return (
    <div className="App">
      <Navbar />
      <div ref={chatRef} className="chats container">
        {chat.map((chat) => (
          <ChatViewer chat={chat} key={chat._id} />
        ))}
      </div>
      <ChatEditor editorRef={editorRef} socket={socket} />
    </div>
  );
}

export default App;
