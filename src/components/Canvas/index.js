import React, { useEffect, useRef, useState } from "react";
import ToolBar from "../ToolBar/index.js";
import "./Canvas.css";
import Konva from "./Konva.js";
import Loading from "./../Loading/index";

const Canvas = ({ imageUrl, setImageUrl, file, setFile, tab }) => {
    const canvasRef = useRef();
    const [canvas, setCanvas] = useState({ height: 0, width: 0 });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setCanvas({
            height: canvasRef.current.clientHeight,
            width: canvasRef.current.clientWidth,
        });
    }, []);


    return (
        <div className="editor-content">
            
            <div ref={canvasRef} className="canvas-container">
            {isLoading && <Loading />}
                <Konva
                    imageUrl={imageUrl}
                    height={canvas.height}
                    width={canvas.width}
                />
            </div>
            <div className="tool-bar">
                {tab === "filter" && (
                    <ToolBar
                        setImageUrl={setImageUrl}
                        file={file}
                        setFile={setFile}
                        setIsLoading={setIsLoading}
                    />
                )}
            </div>
        </div>
    );
};

export default Canvas;
