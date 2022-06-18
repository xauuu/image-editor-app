import { COLOR_CHANGE } from "./actions";

const initialState = {
    color: "#000000",
};

const colorReducer = (state = initialState, action) => {
    switch (action.type) {
        case COLOR_CHANGE:
            return {
                ...state,
                color: action.color,
            };
        default:
            return state;
    }
};

export default colorReducer;
