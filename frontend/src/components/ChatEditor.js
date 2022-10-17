import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { IoMdSend } from "react-icons/io";


const ChatEditor = ({ socket, editorRef }) => {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "code"],
        ["image", "link"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    },
    
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const message = value;
    socket.emit("chat", { message });
    setValue("");
  };

  return (
    <form className="editor bg-dark shadow" ref={editorRef}>
      <ReactQuill
        className="bg-dark text-light container"
        modules={modules}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Chat comes here..."
      />
      {value.length > 0 && (
        <div className="container">
          <button
            type="submit"
            className="btn btn-sm mt-1 mb-1 btn-success"
            onClick={sendMessage}
          >
            {<IoMdSend />}
          </button>
        </div>
      )}
    </form>
  );
};

export default ChatEditor;
