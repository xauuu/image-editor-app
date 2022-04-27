import { FINETUNE_CHANGE } from "./constants";

const initialState = {
    finetune: "",
};

const finetuneReducer = (state = initialState, action) => {
    switch (action.type) {
        case FINETUNE_CHANGE:
            return {
                ...state,
                finetune: action.finetune,
            };
        default:
            return state;
    }
};

export default finetuneReducer;