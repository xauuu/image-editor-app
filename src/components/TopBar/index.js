import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch } from "react-redux";
import { FINETUNE_VALUE_CHANGE, IMG_UPLOAD } from "./../../store/actions";
import "./TopBar.css";
import { SVGReset } from "../../utils/svg.js";

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const TopBar = ({ imageRef }) => {
    const fileRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [imgName, setImgName] = React.useState(null);
    const dispatch = useDispatch();

    const handleDownloadClick = () => {
        setOpen(true);
    };

    const handleDownload = () => {
        const uri = imageRef.current.toDataURL();
        if (imgName != null) {
            downloadURI(uri, imgName + ".png");
            setOpen(false);
            setImgName(null);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUploadClick = (e) => {
        fileRef.current.click();
    };

    const handleResetClick = () => {
        dispatch({
            type: FINETUNE_VALUE_CHANGE,
            brighten: 0,
            contrast: 0,
            blur: 0,
            hue: 0,
            saturation: 0,
            value: 0,
        });
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        dispatch({
            type: IMG_UPLOAD,
            url: base64,
            name: e.target.files[0].name,
        });
    };

    const handleInputChange = (e) => {
        setImgName(e.target.value);
    };

    return (
        <div className="topbar">
            <div className="button upload" onClick={handleUploadClick}>
                <span>Upload</span>
                <input
                    ref={fileRef}
                    className="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            <div className="button download" onClick={handleDownloadClick}>
                <span>Download</span>
            </div>
            <div className="reset" onClick={handleResetClick}>
                <SVGReset />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        Nhập tên hình ảnh để tải xuống
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={imgName}
                        margin="dense"
                        id="name"
                        label="Tên hình ảnh"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    .png
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Huỷ</Button>
                    <Button onClick={handleDownload}>Tải xuống</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TopBar;
