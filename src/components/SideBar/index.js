import React, { useRef, useState } from "react";
import TabItem from "./TabItem.js";
import "./SideBar.css";
import { SVGAdjust, SVGFinetune, SVGFilter, SVGDraw } from "../../utils/svg.js";
import { useDispatch, useSelector } from "react-redux";
import { IMG_CHANGE, IMG_NAME_CHANGE, IMG_UPLOAD } from './../../store/actions';

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
    const fileRef = useRef(null);
    const dispatch = useDispatch()
    const { tab } = useSelector((state) => state.tab);

    const handleClick = (e) => {
        fileRef.current.click();
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
      }

    const handleChange = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        dispatch({
            type: IMG_UPLOAD,
            url: base64,
            name: e.target.files[0].name
        })
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
