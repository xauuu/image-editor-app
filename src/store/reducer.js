import { combineReducers } from "redux";
import tabReducer from "./tabReducer";
import toolReducer from "./toolReducer";
import finetuneReducer from './finetuneReducer';
import fnvalueReducer from './fnvalueReducer';

const reducer = combineReducers({
    tab: tabReducer,
    tool: toolReducer,
    finetune: finetuneReducer,
    value: fnvalueReducer
});

export default reducer;
