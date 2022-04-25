import React from "react";
import "./ToolBar.css";

const Item = ({ tool, img, name, isSelected, setSelectedTool }) => {
    return (
        <div className="item" onClick={() => setSelectedTool(tool)}>
            <div aria-selected={isSelected}>
                <img src={img} />
                <label>{name}</label>
            </div>
        </div>
    );
};

export default Item;
