import React from "react";
import {
    BiRectangle,
    BiStar,
    BiCircle,
    BiText,
    BiPencil,
    BiEraser,
} from "react-icons/bi";
import { COLOR_CHANGE, TOOL_CHANGE } from "../../store/actions.js";
import { useDispatch } from "react-redux";
import ItemFineTune from "./ItemFineTune";
import { useSelector } from "react-redux";
import "react-color-palette/lib/css/styles.css";

const draws = [
    {
        id: 1,
        tool: "text",
        name: "Text",
        icon: <BiText />,
    },
    {
        id: 2,
        tool: "rectangle",
        name: "Rectangle",
        icon: <BiRectangle />,
    },
    {
        id: 3,
        tool: "cricle",
        name: "Cricle",
        icon: <BiCircle />,
    },
    {
        id: 3,
        tool: "star",
        name: "Star",
        icon: <BiStar />,
    },
    // {
    //     id: 4,
    //     tool: "pen",
    //     name: "Pen",
    //     icon: <BiPencil />,
    // },
    {
        id: 5,
        tool: "reset",
        name: "Reset",
        icon: <BiPencil />,
    },
];

const Draw = () => {
    const dispatch = useDispatch();
    const { tool } = useSelector((state) => state.tool);
    // const [color, setColor] = React.useState("#000000");
    const { color } = useSelector((state) => state.color);

    const handleClick = (tool) => {
        dispatch({
            type: TOOL_CHANGE,
            tool: tool,
        });
    };

    console.log(color);

    const handleColorChange = (e) => {
        dispatch({
            type: COLOR_CHANGE,
            color: e.target.value,
        });
    };

    return (
        <React.Fragment>
            <div className="toolbar-options">
                <div className="color-picker">
                    <input
                        className="color-triggerer"
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                    />
                </div>
            </div>
            <div className="finetune-wrapper">
                {draws.map((item) => (
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

export default Draw;
