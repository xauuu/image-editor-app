import React, { useRef, useState } from "react";
import TabItem from "./TabItem.js";
import "./SideBar.css";
import { SVGAdjust, SVGFinetune, SVGFilter, SVGDraw } from "../../utils/svg.js";
import { useDispatch, useSelector } from "react-redux";
import { IMG_CHANGE, IMG_NAME_CHANGE, IMG_UPLOAD } from "./../../store/actions";

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

const SideBar = () => {
    const { tab } = useSelector((state) => state.tab);

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
        </div>
    );
};

export default SideBar;
