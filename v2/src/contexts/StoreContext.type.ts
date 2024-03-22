import { StoreDataType, StoreAction } from "./storeReducer/storeReducer.type";


export type StoreContextType = {
    state: StoreDataType;
    dispatch: React.Dispatch<StoreAction>;
};
