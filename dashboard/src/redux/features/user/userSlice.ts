import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/user.type";

interface IUserState {
    user: IUser | null;
}

const initialState: IUserState = {
    user: null,
};

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        },
        logOut: (state) => {
            state.user = null;
        },
    },
});

export const { getUser, logOut } = usersSlice.actions;

export default usersSlice.reducer;
