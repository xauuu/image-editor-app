import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { MdRotateLeft } from "react-icons/md";
import { CgEditFlipH, CgEditFlipV } from "react-icons/cg";
import ItemFineTune from "./ItemFineTune";
import {
    FINETUNE_VALUE_CHANGE,
    FLIPX_CHANGE,
    FLIPY_CHANGE,
    TOOL_CHANGE,
} from "./../../store/actions";
import { useSelector, useDispatch } from "react-redux";

const adjusts = [
    {
        id: 1,
        tool: "rotate",
        name: "Rotate",
        icon: <MdRotateLeft />,
    },
    {
        id: 2,
        tool: "flipx",
        name: "Flip X",
        icon: <CgEditFlipV />,
    },
    {
        id: 3,
        tool: "flipy",
        name: "Flip Y",
        icon: <CgEditFlipH />,
    },
];

const Adjust = () => {
    const dispatch = useDispatch();
    const { tool } = useSelector((state) => state.tool);
    const { rotate } = useSelector((state) => state.value);
    const handleClick = (tool) => {
        dispatch({
            type: TOOL_CHANGE,
            tool: tool,
        });
        if (tool === "flipx") {
            dispatch({
                type: FLIPX_CHANGE,
            });
        }
        if (tool === "flipy") {
            dispatch({
                type: FLIPY_CHANGE,
            });
        }
    };

    const handleValueChange = (e) => {
        dispatch({
            type: FINETUNE_VALUE_CHANGE,
            rotate: e.target.value,
        });
    };

    return (
        <React.Fragment>
            <div className="toolbar-options">
                {tool === "rotate" && (
                    <Box sx={{ width: 300 }}>
                        <Slider
                            aria-label="Custom marks"
                            min={-180}
                            max={180}
                            defaultValue={rotate}
                            step={10}
                            valueLabelDisplay="on"
                            marks
                            onChange={handleValueChange}
                        />
                    </Box>
                )}
            </div>
            <div className="finetune-wrapper">
                {adjusts.map((item) => (
                    <ItemFineTune
                        key={item.id}
                        tool={item.tool}
                        icon={item.icon}
                        name={item.name}
                        isSelected={tool === item.tool}
                        onClick={handleClick}
                    />
                ))}
            </div>
        </React.Fragment>
    );
};

export default Adjust;
