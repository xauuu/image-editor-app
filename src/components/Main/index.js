import React, { useState } from "react";
import { useSelector } from "react-redux";
import Canvas from "../Canvas/index.js";
import SideBar from "../SideBar/index.js";
import TopBar from "../TopBar/index.js";
import "./index.css";

const Main = () => {
    const [tab, setTab] = useState("");
    // const [selectedTool, setSelectedTool] = useState("");
    const [imageUrl, setImageUrl] = useState("http://localhost:8000/exports/bcomclaiqp61d0b5c251a39dfdc4b2.jpg");
    const [file, setFile] = useState("");

    return (
        <div className="container">
            <TopBar />
            <div className="main">
                <SideBar
                    tab={tab}
                    setTab={setTab}
                    setImageUrl={setImageUrl}
                    file={file}
                    setFile={setFile}
                />
                <Canvas
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    file={file}
                    setFile={setFile}
                    tab={tab}
                />
            </div>
        </div>
    );
};

export default Main;
