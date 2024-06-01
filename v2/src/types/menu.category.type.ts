export interface IMenuCategory {
    id: number;
    name: string;
    subcategories: {
        id: number;
        name: string;
    }[];
}

export interface INavbarMenu {
    title: string;
    path: string;
}
