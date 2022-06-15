import React, { useEffect } from "react";
import Slider from "react-slick";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import MS from "@mui/material/Slider";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
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
    // {
    //     filter: "blur",
    //     name: "Blur",
    //     path: "/filter/gaussian-blur",
    //     img: "/assets/Blur.png",
    // },
    // {
    //     filter: "laplacian",
    //     name: "Laplacian",
    //     path: "/filter/laplacian",
    //     img: "/assets/Laplacian.png",
    // },
    // {
    //     filter: "sobel",
    //     name: "Sobel",
    //     path: "/filter/sobel",
    //     img: "/assets/Sobel.png",
    // },
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
    // {
    //     filter: "kmean",
    //     name: "Kmean",
    //     path: "/segment/kmean",
    //     img: "/assets/Kmean.png",
    // },
    {
        filter: "warm",
        name: "Warming",
        path: "/fancy/warming",
        img: "/assets/Warming.png",
    },
    {
        filter: "cool",
        name: "Cooling",
        path: "/fancy/cooling",
        img: "/assets/Cooling.png",
    },
    {
        filter: "moon",
        name: "Moon",
        path: "/fancy/moon",
        img: "/assets/moon.png",
    },
    {
        filter: "cartoon",
        name: "Cartoon",
        path: "/fancy/cartoon",
        img: "/assets/Cartoon.png",
    },
    {
        filter: "pencil",
        name: "Pencil",
        path: "/fancy/pencil-sketch-grey",
        img: "/assets/Pencil.png",
    },
    // {
    //     filter: "vignette",
    //     name: "Vignette",
    //     path: "/special/apply_vignette",
    //     img: "/assets/vignette.png",
    // },
    // {
    //     filter: "xpro",
    //     name: "Xpro",
    //     path: "/special/xpro",
    //     img: "/assets/xpro.png",
    // },
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
    const [formData, setFormData] = React.useState({
        uri: imgUrl,
        name: imgName,
        a: 50,
        b: 120,
        c: 0,
        x: 5,
        k: 3,
    });
    const [open, setOpen] = React.useState(false);

    const handleClickSubmit = async () => {
        setOpen(false);
        setIsLoading(true);
        await API.post(
            filterItems.find((x) => x.filter === filter).path,
            formData
        ).then((response) => {
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

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = async (filter, path) => {
        dispatch({
            type: FILTER_CHANGE,
            filter: filter,
        });

        if (filter === "threshold" || filter === "blur" || filter === "kmean") {
            setOpen(true);
            return;
        }

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
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change Value</DialogTitle>
                <DialogContent>
                    <Box mt={3} width={300}>
                        {filter === "blur" && (
                            <MS
                                size="small"
                                max={9}
                                min={3}
                                marks={[3, 5, 9]}
                                value={formData.x}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        x: e.target.value,
                                    })
                                }
                                aria-label="Small"
                                valueLabelDisplay="on"
                            />
                        )}
                        {filter === "threshold" && (
                            <MS
                                size="small"
                                max={255}
                                min={0}
                                step={1}
                                value={[formData.a, formData.b]}
                                onChange={(e, newValue) =>
                                    setFormData({
                                        ...formData,
                                        a: newValue[0],
                                        b: newValue[1],
                                    })
                                }
                                aria-label="Small"
                                valueLabelDisplay="on"
                            />
                        )}
                        {filter === "kmean" && (
                            <MS
                                size="small"
                                max={5}
                                min={1}
                                value={formData.k}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        k: e.target.value,
                                    })
                                }
                                aria-label="Small"
                                valueLabelDisplay="on"
                            />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
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
        </React.Fragment>
    );
};

export default Filter;
