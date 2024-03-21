import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IProductState {
    searchText: string;
}

const initialState: IProductState = {
    searchText: "",
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        searchTextForFilterProduct: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
        },
    },
});

export const { searchTextForFilterProduct } = productSlice.actions;

export default productSlice.reducer;
