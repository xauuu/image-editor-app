import React, { useEffect, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { useSelector } from "react-redux";

const Konvas = ({ imageUrl, height, width }) => {
    const [image] = useImage(imageUrl);
    const imageRef = React.useRef();

    const { brighten, contrast, blur } = useSelector((state) => state.value);

    console.log(blur);

    const [coordinates, setCoordinates] = useState({
        x: width / 2,
        y: height / 2,
    });
    const [imageAttr, setImageAttr] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });

    const [scale, setScale] = useState(1);

    useEffect(() => {
        var scale1 = Math.min(width / image?.width, height / image?.height);
        var x = width / 2 - (image?.width / 2) * scale1;
        var y = height / 2 - (image?.height / 2) * scale1;
        setImageAttr({
            x: x,
            y: y,
            width: image?.width * scale1,
            height: image?.height * scale1,
        });
    }, [image]);

    React.useEffect(() => {
        if (image) {
            // you many need to reapply cache on some props changes like shadow, stroke, etc.
            imageRef.current.cache();
        }
    }, [image]);

    const handleWheel = (e) => {
        e.evt.preventDefault();

        const scaleBy = 1.1;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };

        const newScale =
            e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
        setScale(newScale);
        setCoordinates({
            x:
                -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
                newScale,
            y:
                -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
                newScale,
        });
    };

    return (
        <Stage
            width={width}
            height={height}
            x={coordinates.x}
            y={coordinates.y}
            scaleX={scale}
            scaleY={scale}
            draggable
            onWheel={handleWheel}
        >
            <Layer>
                <Image
                    ref={imageRef}
                    x={imageAttr.x}
                    y={imageAttr.y}
                    width={imageAttr.width}
                    height={imageAttr.height}
                    image={image}
                    filters={[
                        Konva.Filters.Brighten,
                        Konva.Filters.Contrast,
                        Konva.Filters.Blur,
                    ]}
                    blurRadius={blur}
                    brightness={brighten}
                    contrast={contrast}
                />
            </Layer>
        </Stage>
    );
};

export default Konvas;
