import React from "react";
import Canvas from "../Canvas/index.js";
import SideBar from "../SideBar/index.js";
import TopBar from "../TopBar/index.js";
import "./index.css";

const Main = () => {
    const layerEl = React.createRef();
    const imageRef = React.useRef();
    return (
        <div className="container">
            <TopBar imageRef={imageRef} layerEl={layerEl} />
            <div className="main">
                <SideBar />
                <Canvas imageRef={imageRef} layerEl={layerEl}/>
            </div>
        </div>
    );
};

export default Main;
