import React from "react";
import { useDispatch } from "react-redux";
import "./ToolBar.css";
import { TOOL_CHANGE } from './../../store/actions';

const Item = ({ tool, img, name, isSelected, onClick }) => {
    
    const handleClick = () => {
        onClick(tool)
    }

    return (
        <div className="item" onClick={handleClick} >
            <div aria-selected={isSelected}>
                <img src={img} alt=""/>
                <label>{name}</label>
            </div>
        </div>
    );
};

export default Item;
