import React from "react";
import "./TopBar.css";
import { useDispatch } from 'react-redux';
import { FINETUNE_VALUE_CHANGE } from './../../store/actions';

const TopBar = () => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch({
            type: FINETUNE_VALUE_CHANGE,
            brighten: 0,
            blur: 0,
            contrast: 0
        })
    }

    return (
        <div className="topbar">
            <div className="button-download" onClick={handleClick}>
                <span>Download</span>
            </div>
        </div>
    );
};

export default TopBar;
