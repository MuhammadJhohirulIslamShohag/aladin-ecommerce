export interface IMenuCategory {
    id: number;
    category: string;
    menu: {
        title: string;
    }[];
}

export interface INavbarMenu {
    title: string;
    path: string;
}
