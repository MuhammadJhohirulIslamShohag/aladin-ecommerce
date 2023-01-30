import { StoreDataType, StoreAction } from "../states/storeReducer/storeReducer.type";

export type StoreContextType = {
    state: StoreDataType;
    dispatch: React.Dispatch<StoreAction>;
};
