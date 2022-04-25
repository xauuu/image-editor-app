import React from "react";

const TabItem = ({ icon, tab, isSelected, name, setTab }) => {
    return (
        <div
            className="sideBar-item"
            aria-selected={isSelected}
            onClick={() => setTab(tab)}
        >
            {icon}
            <label>{name}</label>
        </div>
    );
};

export default TabItem;
