import React from "react";
import "./ToolBar.css";

const Item = ({ filter, img, name, path, isSelected, onClick }) => {
    
    const handleClick = () => {
        onClick(filter, path)
    }

    return (
        <div className="item" onClick={handleClick} >
            <div aria-selected={isSelected}>
                <img src={process.env.PUBLIC_URL + img} alt=""/>
                <label>{name}</label>
            </div>
        </div>
    );
};

export default Item;
