import React, { useRef, useState } from "react";
import TabItem from "./TabItem.js";
import "./SideBar.css";
import { SVGAdjust, SVGFinetune, SVGFilter, SVGDraw } from "../../utils/svg.js";
import { useSelector } from "react-redux";

const tabs = [
    {
        icon: <SVGAdjust />,
        tab: "adjust",
        name: "Adjust",
    },
    {
        icon: <SVGFinetune />,
        tab: "finetune",
        name: "Finetune",
    },
    {
        icon: <SVGFilter />,
        tab: "filter",
        name: "Filter",
    },
    {
        icon: <SVGDraw />,
        tab: "draw",
        name: "Draws",
    },
];

const SideBar = ({ setImageUrl, setFile }) => {
    const fileRef = useRef(null);

    const { tab } = useSelector((state) => state.tab);

    const handleClick = (e) => {
        fileRef.current.click();
    };

    const handleChange = (e) => {
        setFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        console.log(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="sideBar">
            {tabs.map((item) => (
                <TabItem
                    key={item.tab}
                    icon={item.icon}
                    tab={item.tab}
                    name={item.name}
                    isSelected={tab === item.tab}
                />
            ))}
            <div className="sideBar-item" onClick={handleClick}>
                <label>Upload</label>
                <input
                    ref={fileRef}
                    className="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default SideBar;
