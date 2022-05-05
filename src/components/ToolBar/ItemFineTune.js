import React from "react";

const ItemFineTune = ({ icon, name, tool, isSelected, onClick }) => {

    const handleClick = () => {
        onClick(tool)
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
