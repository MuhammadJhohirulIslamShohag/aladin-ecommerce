import {
    StoreDataType,
    StoreAction,
    StoreActionType,
} from "./storeReducer.type";

export const initialState: StoreDataType = {
    user: null,
};

export const storeReducer = (
    state: StoreDataType = initialState,
    action: StoreAction
): StoreDataType => {
    switch (action.type) {
        case StoreActionType.LOGGED_IN_USER:
            return { ...state, user: action.payload };
        case StoreActionType.LOGOUT_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};
