import React, { useEffect } from "react";
import Slider from "react-slick";
import API from "../../utils/API.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ToolBar.css";
import Item from "./ItemFilter.js";
import { useDispatch, useSelector } from "react-redux";
import { urlImage } from "../../store/constants.js";
import { IMG_CHANGE, TOOL_CHANGE } from "./../../store/actions";

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
        tool: "grahp-cut",
        name: "Grahp Cut",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 7,
        tool: "meanshift",
        name: "Meanshift",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 8,
        tool: "kmean",
        name: "Kmean",
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

const ToolBar = ({ setIsLoading }) => {
    const dispatch = useDispatch();
    const { tool } = useSelector((state) => state.tool);
    const { imgUrl, imgName } = useSelector((state) => state.img);

    useEffect(() => {
        let formData = {
            uri: imgUrl,
            name: imgName,
            a: 50,
            b: 120,
            c: 0,
            x: 5,
            k: 3,
        };

        const fetchData = async () => {
            setIsLoading(true);
            if (tool === "hist") {
                await API.post("/point/hist", formData).then((response) => {
                    if (response.status === 200) {
                        dispatch({
                            type: IMG_CHANGE,
                            image: urlImage + response.data.filename,
                        });
                        setIsLoading(false);
                    } else return;
                });
            } else if (tool === "original") {
                dispatch({
                    type: IMG_CHANGE,
                    image: imgUrl,
                });
                setIsLoading(false);
            } else if (tool === "blur") {
                await API.post("/filter/gaussian-blur", formData).then(
                    (response) => {
                        if (response.status === 200) {
                            dispatch({
                                type: IMG_CHANGE,
                                image: urlImage + response.data.filename,
                            });
                            setIsLoading(false);
                        } else return;
                    }
                );
            } else if (tool === "reverse") {
                await API.post("/point/reverse", formData).then((response) => {
                    if (response.status === 200) {
                        dispatch({
                            type: IMG_CHANGE,
                            image: urlImage + response.data.filename,
                        });
                        setIsLoading(false);
                    } else return;
                });
            } else if (tool === "threshold") {
                await API.post("/point/threshold", formData).then(
                    (response) => {
                        if (response.status === 200) {
                            dispatch({
                                type: IMG_CHANGE,
                                image: urlImage + response.data.filename,
                            });
                            setIsLoading(false);
                        } else return;
                    }
                );
            } else if (tool === "grahp-cut") {
                await API.post("/segment/grahp-cut", formData).then(
                    (response) => {
                        if (response.status === 200) {
                            dispatch({
                                type: IMG_CHANGE,
                                image: urlImage + response.data.filename,
                            });
                            setIsLoading(false);
                        } else return;
                    }
                );
            } else if (tool === "kmean") {
                await API.post("/segment/kmean", formData).then(
                    (response) => {
                        if (response.status === 200) {
                            dispatch({
                                type: IMG_CHANGE,
                                image: urlImage + response.data.filename,
                            });
                            setIsLoading(false);
                        } else return;
                    }
                );
            } else if (tool === "meanshift") {
                await API.post("/segment/meanshift", formData).then(
                    (response) => {
                        if (response.status === 200) {
                            dispatch({
                                type: IMG_CHANGE,
                                image: urlImage + response.data.filename,
                            });
                            setIsLoading(false);
                        } else return;
                    }
                );
            }
            setIsLoading(false);
        };

        fetchData();
    }, [tool]);

    const handleClick = (tool) => {
        dispatch({
            type: TOOL_CHANGE,
            tool: tool,
        });
    };

    return (
        <Slider {...settings}>
            {filterItems.map((item) => (
                <Item
                    key={item.tool}
                    tool={item.tool}
                    img={item.img}
                    name={item.name}
                    isSelected={tool === item.tool}
                    onClick={handleClick}
                />
            ))}
        </Slider>
    );
};

export default ToolBar;
