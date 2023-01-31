import React, { createContext, useContext, useReducer } from "react";
import { StoreContextType } from "./StoreContext.type";
import {
    storeReducer,
    initialState,
} from "../states/storeReducer/storeReducer";

const StoreContext = createContext<StoreContextType | null>(null);

export const useStoreContext = () => {
    return useContext(StoreContext) as StoreContextType;
};

const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);

    const values = {
        state,
        dispatch,
    };
    return (
        <StoreContext.Provider value={values}>{children}</StoreContext.Provider>
    );
};

export default StoreContextProvider;
