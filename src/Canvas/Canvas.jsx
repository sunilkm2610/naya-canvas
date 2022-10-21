import React, { useRef, useEffect, useState } from "react";
import "./canvas.scss";
import axios from "axios";
import Navbar from "../components/Navbar";
import Accordion from "../components/Accordions";

const Canvas = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [users, setUsers] = React.useState([]);
  const updateUrl = async (imgUrl) => {
    await axios.put(`http://localhost:4000/api/user/update-url`, {
      user: userInfo._id,
      canvasUrl: imgUrl,
    });
  };
  useEffect(() => {
    let user = window.localStorage.getItem("user");

    if (user) {
      user = JSON.parse(user);
      setUserInfo(user.user);
    }
    const getAllUsers = async () => {
      const allUsers = await axios.get("http://localhost:4000/api/user");
      setUsers(allUsers.data.users);
      allUsers.data.users.map((canvas) => {
        var img = new Image();
        img.src = canvas.canvasUrl;
        img.onload = function () {
          context.drawImage(img, 0, 0, img.width / 2, img.height / 2); // Or
        };
      });
    };

    const canvas = canvasRef.current;
    canvas.width = 1800;
    canvas.height = 900;
    canvas.style.width = "900px";
    canvas.style.height = "450px";

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = user && user.user.color;
    context.lineWidth = 5;
    contextRef.current = context;
    getAllUsers();
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  const finishDrwaing = () => {
    const canvas = canvasRef.current;
    contextRef.current.closePath();
    setIsDrawing(false);
    const imageURI = canvas.toDataURL("image/jpg", 0.1);
    updateUrl(imageURI);
  };
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };
  const clearCanvas = async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    updateUrl("");
  };
  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="screen">
        <div className="canvas">
          <canvas
            id="canvas"
            onMouseDown={startDrawing}
            onMouseUp={finishDrwaing}
            onMouseMove={draw}
            ref={canvasRef}
          >
            This text is displayed if your browser does not support HTML5
            Canvas.
          </canvas>
        </div>
        <div className="details">
          <button onClick={clearCanvas}>Clear</button>
          <Accordion />
        </div>
      </div>
    </div>
  );
};

export default Canvas;
