import React, { createContext, useReducer } from "react";
import {
    storeReducer,
    initialState,
} from "../states/storeReducer/storeReducer";
import {
    StoreDataType,
    StoreAction,
} from "../states/storeReducer/storeReducer.type";

const StoreContext = createContext(null);

const StoreContextProvider = () => {
    const [state, dispatch] = useReducer(storeReducer, initialState);

    const values:
        | {
              state: StoreDataType;
              dispatch: React.Dispatch<StoreAction>;
          }
        | any = {
        state,
        dispatch,
    };
    return <StoreContext.Provider value={values}></StoreContext.Provider>;
};

export default StoreContextProvider;
