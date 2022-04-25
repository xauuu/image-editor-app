import React, { useState } from "react";
import Canvas from "../Canvas/index.js";
import SideBar from "../SideBar/index.js";
import "./index.css";

const Main = () => {
    const [tab, setTab] = useState("");
    // const [selectedTool, setSelectedTool] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState("");

    return (
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
    );
};

export default Main;
