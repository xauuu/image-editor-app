import React, { useEffect } from "react";
import Slider from "react-slick";
import API from "../../utils/API.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ToolBar.css";
import Item from "./ItemFilter.js";
import { useDispatch, useSelector } from "react-redux";
import { urlImage } from "../../store/constants.js";
import { FILTER_CHANGE, IMG_CHANGE } from "./../../store/actions";

const filterItems = [
    {
        id: 1,
        filter: "original",
        name: "Original",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 2,
        filter: "blur",
        name: "Blur",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 3,
        filter: "hist",
        name: "Histogram",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 4,
        filter: "reverse",
        name: "Reverse",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 5,
        filter: "threshold",
        name: "Threshold",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 6,
        filter: "grahp-cut",
        name: "Grahp Cut",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 7,
        filter: "meanshift",
        name: "Meanshift",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        id: 8,
        filter: "kmean",
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
    const { filter } = useSelector((state) => state.filter);
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
            if (filter === "hist") {
                await API.post("/point/hist", formData).then((response) => {
                    if (response.status === 200) {
                        dispatch({
                            type: IMG_CHANGE,
                            image: urlImage + response.data.filename,
                        });
                        setIsLoading(false);
                    } else return;
                });
            } else if (filter === "original") {
                dispatch({
                    type: IMG_CHANGE,
                    image: imgUrl,
                });
                setIsLoading(false);
            } else if (filter === "blur") {
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
            } else if (filter === "reverse") {
                await API.post("/point/reverse", formData).then((response) => {
                    if (response.status === 200) {
                        dispatch({
                            type: IMG_CHANGE,
                            image: urlImage + response.data.filename,
                        });
                        setIsLoading(false);
                    } else return;
                });
            } else if (filter === "threshold") {
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
            } else if (filter === "grahp-cut") {
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
            } else if (filter === "kmean") {
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
            } else if (filter === "meanshift") {
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
    }, [filter]);

    const handleClick = (filter) => {
        dispatch({
            type: FILTER_CHANGE,
            filter: filter,
        });
    };

    return (
        <Slider {...settings}>
            {filterItems.map((item) => (
                <Item
                    key={item.filter}
                    filter={item.filter}
                    img={item.img}
                    name={item.name}
                    isSelected={filter === item.filter}
                    onClick={handleClick}
                />
            ))}
        </Slider>
    );
};

export default ToolBar;
