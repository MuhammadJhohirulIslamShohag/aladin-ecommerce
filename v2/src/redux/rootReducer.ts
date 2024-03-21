import { baseApi } from "./api/baseApi";
import productReducer from "./features/product/productSlice";

export const reducer = {
    product: productReducer,
    [baseApi.reducerPath]: baseApi.reducer,
};
