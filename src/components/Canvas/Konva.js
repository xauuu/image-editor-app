import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Image, Text, Group, Transformer } from "react-konva";
import Konva from "konva";
import { useSelector } from "react-redux";
import Circ from "./../tools/Circle";
import Rectangle from "./../tools/Rectangle";
import { addLine } from "./../tools/line";
import Stars from "../tools/Star.js";
import { TextEditor } from "./../tools/TextEditor";

const SimpleText = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = useRef();
    const trRef = useRef();

    const [editorEnabled, setEditorEnabled] = useState(false);
    const [isTransform, setIsTransform] = useState(false);
    const [isCursor, setIsCursor] = useState({});

    useEffect(() => {
        if (isSelected && trRef.current !== null) {
            // we need to attach transformer manually
            trRef.current?.setNodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <Group draggable>
            <Text
                onClick={onSelect}
                onTap={onSelect}
                onDblClick={(e) => {
                    const absPosition = e.target.getAbsolutePosition();
                    setEditorEnabled(true);
                    setIsCursor(absPosition);
                }}
                ref={shapeRef}
                visible={!editorEnabled}
                {...shapeProps}
                draggable={true}
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back

                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
                perfectDrawEnabled={false}
            />

            {editorEnabled && (
                <Group>
                    <TextEditor
                        value={shapeProps.text}
                        textNodeRef={shapeRef}
                        onChange={onChange}
                        onBlur={() => {
                            setEditorEnabled(false);
                        }}
                        cursorPosition={isCursor}
                    />
                </Group>
            )}

            {isSelected && (
                <Transformer
                    rotateEnabled={false}
                    flipEnabled={false}
                    enabledAnchors={["middle-left", "middle-right"]}
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        newBox.width = Math.max(30, newBox.width);
                        return newBox;
                    }}
                />
            )}
        </Group>
    );
};

const Konvas = ({ imageRef, layerEl, height, width }) => {
    const stageEl = React.createRef();
    const [image, setImage] = useState();
    const [scale, setScale] = useState(1);
    const [circles, setCircles] = useState([]);
    const [rectangles, setRectangles] = useState([]);
    const [stars, setStars] = useState([]);
    const [texts, setTexts] = useState([]);
    const [shapes, setShapes] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [, updateState] = React.useState();
    const [isDraw, setIsDraw] = useState(false);
    const { image: img } = useSelector((state) => state.img);
    const { brighten, contrast, blur, hue, saturation, value, rotate } =
        useSelector((state) => state.value);
    const { flipx, flipy } = useSelector((state) => state.flip);
    const { color } = useSelector((state) => state.color);
    const { tool } = useSelector((state) => state.tool);
    const { tab } = useSelector((state) => state.tab);
    const [coordinates, setCoordinates] = useState({
        x: width / 2,
        y: height / 2,
    });
    const [imageAttr, setImageAttr] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const imgLoad = new window.Image();
        imgLoad.src = img;
        imgLoad.crossOrigin = "anonymous";
        imgLoad.onload = () => {
            setImage(imgLoad);
            var scale1 = Math.min(
                width / imgLoad?.width,
                height / imgLoad?.height
            );
            setImageAttr({
                width: imgLoad?.width * scale1,
                height: imgLoad?.height * scale1,
            });
        };
    }, [img, width, height]);

    useEffect(() => {
        if (image) {
            imageRef.current.cache();
        }
    }, [image, brighten, contrast, blur]);

    useEffect(() => {
        if (tool === "reset") {
            setCircles([]);
            setRectangles([]);
            setStars([]);
            setTexts([]);
            setShapes([])
        }
    }, [tool]);

    const handleLayerClick = (e) => {
        const stage = e.target.getStage();
        if (!isDraw) return;
        if (tool === "cricle") {
            addCircle(
                stage.getPointerPosition().x,
                stage.getPointerPosition().y
            );
        }
        if (tool === "rectangle") {
            addRectangle(
                stage.getPointerPosition().x,
                stage.getPointerPosition().y
            );
        }
        if (tool === "star") {
            addStar(stage.getPointerPosition().x, stage.getPointerPosition().y);
        }
        if (tool === "text") {
            addText(stage.getPointerPosition().x, stage.getPointerPosition().y);
        }
        if (tool === "pen") {
            drawLine();
        }
    };

    const forceUpdate = React.useCallback(() => updateState({}), []);

    const addCircle = (x, y) => {
        const circ = {
            x: x,
            y: y,
            width: 100,
            height: 100,
            fill: color,
            id: `circ${circles.length + 1}`,
        };
        const circs = circles.concat([circ]);
        setCircles(circs);
        const shs = shapes.concat([`circ${circles.length + 1}`]);
        setShapes(shs);
    };

    const addRectangle = (x, y) => {
        const rect = {
            x: x,
            y: y,
            width: 100,
            height: 100,
            fill: color,
            id: `rect${rectangles.length + 1}`,
        };
        const rects = rectangles.concat([rect]);
        setRectangles(rects);
        const shs = shapes.concat([`rect${rectangles.length + 1}`]);
        setShapes(shs);
    };

    const addStar = (x, y) => {
        const s = {
            x: x,
            y: y,
            numPoints: 5,
            innerRadius: 20,
            outerRadius: 40,
            width: 100,
            height: 100,
            fill: color,
            id: `star${stars.length + 1}`,
        };
        const star = stars.concat([s]);
        setStars(star);
        const shs = shapes.concat([`star${stars.length + 1}`]);
        setShapes(shs);
    };

    const drawLine = () => {
        addLine(stageEl.current.getStage(), layerEl.current);
    };

    const addText = (x, y) => {
        const t = {
            x: x,
            y: y,
            text: "hello world",
            fontSize: 29,
            fill: color,
            fontStyle: "normal",
            id: `text${texts.length + 1}`,
            object: "simpleText",
            width: 100,
        };
        const text = texts.concat([t]);
        setTexts(text);
        const shs = shapes.concat([`text${texts.length + 1}`]);
        setShapes(shs);
    };

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

    document.addEventListener("keydown", (ev) => {
        if (ev.code === "Delete") {
            let index = circles.findIndex((c) => c.id === selectedId);
            if (index !== -1) {
                circles.splice(index, 1);
                setCircles(circles);
            }
            index = rectangles.findIndex((r) => r.id === selectedId);
            if (index !== -1) {
                rectangles.splice(index, 1);
                setRectangles(rectangles);
            }
            index = stars.findIndex((r) => r.id === selectedId);
            if (index !== -1) {
                stars.splice(index, 1);
                setStars(stars);
            }
            index = texts.findIndex((r) => r.id === selectedId);
            if (index !== -1) {
                texts.splice(index, 1);
                setTexts(texts);
            }
            forceUpdate();
        }
    });

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        setIsDraw(false);
        if (clickedOnEmpty) {
            selectShape(null);
            setIsDraw(true);
        }
    };

    return (
        <Stage
            ref={stageEl}
            width={width}
            height={height}
            x={coordinates.x}
            y={coordinates.y}
            scaleX={scale}
            scaleY={scale}
            onWheel={handleWheel}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            onClick={handleLayerClick}
        >
            <Layer ref={layerEl}>
                <Image
                    draggable={tab === "draw" ? false : true}
                    ref={imageRef}
                    scaleY={flipx ? -1 : 1}
                    scaleX={flipy ? -1 : 1}
                    x={width / 2}
                    y={height / 2}
                    width={imageAttr.width}
                    height={imageAttr.height}
                    offsetX={imageAttr.width / 2}
                    offsetY={imageAttr.height / 2}
                    image={image}
                    rotation={rotate}
                    filters={[
                        Konva.Filters.Brighten,
                        Konva.Filters.Contrast,
                        Konva.Filters.Blur,
                        Konva.Filters.HSV,
                    ]}
                    blurRadius={blur}
                    brightness={brighten}
                    contrast={contrast}
                    hue={hue}
                    saturation={saturation}
                    value={value}
                />
                {circles.map((circle, i) => {
                    return (
                        <Circ
                            key={i}
                            shapeProps={circle}
                            isSelected={circle.id === selectedId}
                            onSelect={() => {
                                selectShape(circle.id);
                            }}
                            onChange={(newAttrs) => {
                                const circs = circles.slice();
                                circs[i] = newAttrs;
                                setCircles(circs);
                            }}
                        />
                    );
                })}
                {rectangles.map((rect, i) => {
                    return (
                        <Rectangle
                            key={i}
                            shapeProps={rect}
                            isSelected={rect.id === selectedId}
                            onSelect={() => {
                                selectShape(rect.id);
                            }}
                            onChange={(newAttrs) => {
                                const rects = rectangles.slice();
                                rects[i] = newAttrs;
                                setRectangles(rects);
                            }}
                        />
                    );
                })}
                {stars.map((star, i) => {
                    return (
                        <Stars
                            key={i}
                            shapeProps={star}
                            isSelected={star.id === selectedId}
                            onSelect={() => {
                                selectShape(star.id);
                            }}
                            onChange={(newAttrs) => {
                                const star = stars.slice();
                                star[i] = newAttrs;
                                setStars(star);
                            }}
                        />
                    );
                })}
                {texts.map((value, index) => (
                    <>
                        <SimpleText
                            key={value.id}
                            shapeProps={value}
                            isSelected={value.id === selectedId}
                            onSelect={() => {
                                selectShape(value.id);
                            }}
                            onChange={(newAttrs) => {
                                const text = texts.slice();
                                text[index] = newAttrs;
                                setTexts(text);
                            }}
                        />
                    </>
                ))}
            </Layer>
        </Stage>
    );
};

export default Konvas;
