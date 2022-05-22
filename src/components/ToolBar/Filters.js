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
        filter: "original",
        name: "Original",
        path: "",
        img: "/assets/original.jpg",
    },
    {
        filter: "reverse",
        name: "Reverse",
        path: "/point/reverse",
        img: "/assets/reverse.png",
    },
    {
        filter: "log",
        name: "Log",
        path: "/point/log",
        img: "/assets/log.png",
    },
    {
        filter: "threshold",
        name: "Threshold",
        path: "/point/threshold",
        img: "/assets/threshold.png",
    },
    {
        filter: "hist",
        name: "Histogram",
        path: "/point/hist",
        img: "/assets/Histogram.png",
    },
    {
        filter: "blur",
        name: "Blur",
        path: "/filter/gaussian-blur",
        img: "/assets/Blur.png",
    },
    {
        filter: "laplacian",
        name: "Laplacian",
        path: "/filter/laplacian",
        img: "/assets/Laplacian.png",
    },
    // {
    //     filter: "grahp-cut",
    //     name: "Grahp Cut",
    //     path: "/segment/graph-cut",
    //     img: "/assets/Grahp Cut.png",
    // },
    // {
    //     filter: "meanshift",
    //     name: "Meanshift",
    //     path: "/segment/meanshift",
    //     img: "/assets/Meanshift.png",
    // },
    {
        filter: "kmean",
        name: "Kmean",
        path: "/segment/kmean",
        img: "/assets/Kmean.png",
    },
];
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
};

const Filter = ({ setIsLoading }) => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.filter);
    const { imgUrl, imgName } = useSelector((state) => state.img);

    const handleClick = async (filter, path) => {
        let formData = {
            uri: imgUrl,
            name: imgName,
            a: 50,
            b: 120,
            c: 0,
            x: 5,
            k: 3,
        };
        dispatch({
            type: FILTER_CHANGE,
            filter: filter,
        });

        setIsLoading(true);
        if (filter === "original") {
            dispatch({
                type: IMG_CHANGE,
                image: imgUrl,
            });
            setIsLoading(false);
            return;
        }
        await API.post(path, formData).then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: IMG_CHANGE,
                    image: urlImage + response.data.filename,
                });
                setIsLoading(false);
            } else return;
        });
        setIsLoading(false);
    };

    return (
        <Slider {...settings}>
            {filterItems.map((item, i) => (
                <Item
                    key={i}
                    filter={item.filter}
                    img={item.img}
                    name={item.name}
                    path={item.path}
                    isSelected={filter === item.filter}
                    onClick={handleClick}
                />
            ))}
        </Slider>
    );
};

export default Filter;
