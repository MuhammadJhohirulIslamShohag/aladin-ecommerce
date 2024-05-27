interface IShopInitialState {
    openFilterMobileMenu: boolean;
    openSortingMenu: boolean;
    gridColumn: boolean;
    price: number[];
    rating: number;
    categoriesId: string[];
    subCategoryId: string[];
    sortConfig: {
        sortBy: string;
        sortOrder: string;
    };
    brand: string;
    color: string;
    shipping: string;
    pageNumber: number;
}

export type TShopAction = {
    type: "SET_SHOP_STATE" | "CLEAR_SHOP_STATE";
    payload?: Partial<IShopInitialState>;
};

const shopInitialState: IShopInitialState = {
    openFilterMobileMenu: false,
    openSortingMenu: false,
    gridColumn: true,
    price: [0, 0],
    rating: 0,
    categoriesId: [],
    subCategoryId: [],
    sortConfig: {
        sortBy: "",
        sortOrder: "",
    },
    brand: "",
    color: "",
    shipping: "",
    pageNumber: 1,
};

const shopReducer = (state: IShopInitialState, action: any) => {
    switch (action.type) {
        case "SET_SHOP_STATE":
            return { ...state, ...action.payload };
        case "CLEAR_SHOP_STATE":
            return {
                sortingMenu: false,
                filterMobileMenu: false,
                gridColumn: true,
                price: [0, 3000],
                rating: 0,
                categoriesId: [],
                subCategoryId: [],
                sortConfig: {
                    sortBy: "createdAt",
                    sortOrder: "desc",
                },
                brand: "",
                color: "",
                shipping: "",
                pageNumber: 1,
            };
        default:
            return state;
    }
};

export { shopReducer, shopInitialState };
