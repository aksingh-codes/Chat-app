import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ChatViewer = ({ chat }) => {
  const modules = {
    toolbar: false,
  };
  return (
    <>
      <div className="d-flex flex-row justify-content-start mb-4">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          alt="avatar 1"
          style={{ width: "45px", height: "100%" }}
        />
        <ReactQuill
          className="p-1 ms-2 viewer shadow-sm"
          style={{
            borderRadius: "15px",
            backgroundColor: "rgba(57, 192, 237,.2)",
          }}
          readOnly
          value={chat.message}
          modules={modules}
        />
      </div>
      <div className="d-flex flex-row justify-content-end mb-4">
        <ReactQuill
          className="p-1 me-2 viewer shadow-sm"
          style={{
            borderRadius: "15px",
            backgroundColor: "#f9f4ba",
          }}
          readOnly
          value={chat.message}
          modules={modules}
        />
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
          alt="avatar 1"
          style={{ width: "45px", height: "100%" }}
        />
      </div>
    </>
  );
};

export default ChatViewer;

// <ReactQuill
//   modules={modules}
//   readOnly
//   className="viewer"
//   value={chat.message}
// />
