import { baseApi } from "./api/baseApi";
import userSlice from "./features/user/userSlice";

export const reducer = {
    user: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
};
