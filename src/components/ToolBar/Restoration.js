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
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        filter: "arithmetic-mean",
        name: "Arithmetic Mean",
        path: "/restoration/tb-so-hoc",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        filter: "geometric-mean",
        name: "Geometric Mean",
        path: "/restoration/tb-hinh-hoc",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    // {
    //     filter: "contraharmonic-mean",
    //     name: "Contraharmonic Mean",
    //     path: "/restoration/tb-contraharmonic",
    //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    // },
    {
        filter: "harmonic-mean",
        name: "Harmonic Mean",
        path: "/restoration/tb-harmonic",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        filter: "median",
        name: "Median",
        path: "/restoration/loc-trung-vi",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        filter: "min",
        name: "Min",
        path: "/restoration/loc-min",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        filter: "max",
        name: "Max",
        path: "/restoration/loc-max",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        filter: "mid-point",
        name: "Mid Point",
        path: "/restoration/loc-trung-vi",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlYcLkXShDO3OpHYiXIXwPPa8LSiWg0hfsQ&usqp=CAU",
    },
    {
        filter: "alpha",
        name: "Alpha",
        path: "/restoration/loc-alpha",
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

const Restoration = ({ setIsLoading }) => {
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

export default Restoration;
