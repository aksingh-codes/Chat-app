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
        <div
          className="ms-2 shadow-sm chat"
          style={{
            borderRadius: "15px",
            backgroundColor: "rgb(216, 245, 255)",
          }}
        >
          <p
            className="mb-0 ps-2 pt-1 pb-1 pe-2 text-success"
            style={{
              background: "rgb(216, 245, 255)",
              fontSize: "0.6rem",
              borderTopRightRadius: "15px",
              borderBottom: "1px solid #fff",
            }}
          >
            @someuser
          </p>
          <ReactQuill
            className="p-2 viewer"
            readOnly
            value={chat.message}
            modules={modules}
          />
          <p
            className="mb-0 ps-2 pt-1 pb-1 pe-2"
            style={{
              color: 'gray',
              textAlign: 'right',
              background: "rgb(216, 245, 255)",
              fontSize: "0.5rem",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
            }}
          >
            {new Date(chat.date).toLocaleString()}
          </p>
        </div>
      </div>
      {/* <div className="d-flex flex-row justify-content-end mb-4">
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
      </div> */}
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
