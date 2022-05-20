import { combineReducers } from "redux";
import tabReducer from "./tabReducer";
import fnvalueReducer from './fnvalueReducer';
import flipReducer from './flipReducer';
import imageReducer from "./imageReducer";
import filterReducer from './filterReducer';
import toolReducer from './toolReducer';

const reducer = combineReducers({
    tab: tabReducer,
    tool: toolReducer,
    filter: filterReducer,
    value: fnvalueReducer,
    flip: flipReducer,
    img: imageReducer,
});

export default reducer;
