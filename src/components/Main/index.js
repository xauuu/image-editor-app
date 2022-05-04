import React, { useState } from "react";
import { useSelector } from "react-redux";
import Canvas from "../Canvas/index.js";
import SideBar from "../SideBar/index.js";
import TopBar from "../TopBar/index.js";
import "./index.css";

const Main = () => {
    const imageRef = React.useRef();
    return (
        <div className="container">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <TopBar imageRef={imageRef} />
            <div className="main">
                <SideBar />
                <Canvas imageRef={imageRef} />
            </div>
        </div>
    );
};

export default Main;
