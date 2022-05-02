import { combineReducers } from "redux";
import tabReducer from "./tabReducer";
import toolReducer from "./toolReducer";
import finetuneReducer from './finetuneReducer';
import fnvalueReducer from './fnvalueReducer';
import flipReducer from './flipReducer';
import imageReducer from "./imageReducer";

const reducer = combineReducers({
    tab: tabReducer,
    tool: toolReducer,
    finetune: finetuneReducer,
    value: fnvalueReducer,
    flip: flipReducer,
    img: imageReducer
});

export default reducer;
