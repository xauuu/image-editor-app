import React from "react";
import { useDispatch } from "react-redux";
import { FINETUNE_CHANGE } from "./../../store/constants";

const ItemFineTune = ({ icon, name, tool, isSelected }) => {
    const dispacth = useDispatch();

    const handleClick = () => {
        dispacth({
            type: FINETUNE_CHANGE,
            finetune: tool,
        });
    };

    return (
        <div
            className="finetune-item"
            aria-selected={isSelected}
            onClick={handleClick}
        >
            {icon}
            <label>{name}</label>
        </div>
    );
};

export default ItemFineTune;
