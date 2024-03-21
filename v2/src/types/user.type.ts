export interface ICurrentUser {
    username?: string;
    fullName?: string;
    image?: {
        public_id: string;
        url: string;
    };
    email?: string;
    about?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
    _id?: string;
}

export interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface IShippingAddress {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    postCode: string;
    country: string;
    state: string;
    defaultAddress: boolean;
}
