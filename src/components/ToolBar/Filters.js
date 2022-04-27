import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import API from "../../utils/API.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ToolBar.css";
import Item from "./ItemFilter.js";
import { useSelector } from "react-redux";

const filterItems = [
    {
        id: 1,
        tool: "original",
        name: "Original",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 2,
        tool: "blur",
        name: "Blur",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 3,
        tool: "hist",
        name: "Histogram",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 4,
        tool: "reverse",
        name: "Reverse",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 5,
        tool: "threshold",
        name: "Threshold",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 6,
        tool: "midpoint",
        name: "Midpoint",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 7,
        tool: "harmonic",
        name: "Harmonic",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
];
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
};

const ToolBar = ({ setImageUrl, file, setIsLoading }) => {

    const { tool } = useSelector((state) => state.tool);

    useEffect(() => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("a", 50);
        formData.append("b", 120);
        formData.append("x", 5);

        const fetchData = async () => {
            setIsLoading(true);
            if (tool === "hist") {
                await API.post("/point/hist", formData).then((response) => {
                    if (response.status === 200) {
                        setImageUrl(
                            "http://192.168.123.86:8000/exports/" +
                                response.data.filename
                        );
                        setIsLoading(false);
                    } else return;
                });
            } else if (tool === "original") {
                setImageUrl(URL.createObjectURL(file));
                setIsLoading(false);
            } else if (tool === "blur") {
                await API.post("/filter/gaussian_blur", formData).then(
                    (response) => {
                        if (response.status === 200) {
                            setImageUrl(
                                "http://192.168.123.86:8000/exports/" +
                                    response.data.filename
                            );
                            setIsLoading(false);
                        } else return;
                    }
                );
            } else if (tool === "reverse") {
                await API.post("/point/reverse", formData).then((response) => {
                    if (response.status === 200) {
                        setImageUrl(
                            "http://192.168.123.86:8000/exports/" +
                                response.data.filename
                        );
                        setIsLoading(false);
                    } else return;
                });
            } else if (tool === "threshold") {
                await API.post("/point/threshold", formData).then(
                    (response) => {
                        if (response.status === 200) {
                            setImageUrl(
                                "http://192.168.123.86:8000/exports/" +
                                    response.data.filename
                            );
                            setIsLoading(false);
                        } else return;
                    }
                );
            }
        };

        fetchData();
    }, [tool]);

    return (
        <Slider {...settings}>
            {filterItems.map((item) => (
                <Item
                    key={item.tool}
                    tool={item.tool}
                    img={item.img}
                    name={item.name}
                    isSelected={tool === item.tool}
                />
            ))}
        </Slider>
    );
};

export default ToolBar;
