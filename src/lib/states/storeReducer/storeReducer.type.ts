export enum StoreActionType {
    LOGGED_IN_USER = "LOGGED_IN_USER",
    LOGOUT_USER = "LOGOUT_USER",
}

interface UserType {
    email: string;
    name: string;
    role: string;
    token: string;
    _id: string;
}

export type StoreDataType = {
    user: UserType | null;
}

export interface StoreAction {
    type: StoreActionType;
    payload: any;
}
