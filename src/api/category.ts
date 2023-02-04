import axios from "axios";

export const createCategory = async (token: string, categoryName: string) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/category`,
        {
            categoryName,
        },
        {
            headers: {
                token,
            },
        }
    );
};
export const getListOfCategory = async () =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/categories`);

export const getSingleCategory = async (slug: string) =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/categories/${slug}`);

export const updateCategory = async (
    token: string,
    updateCategoryName: string,
    slug: string
) => {
    return await axios.put(
        `${process.env.NEXT_PUBLIC_server_api}/categories/${slug}`,
        {
            updateCategoryName,
        },
        {
            headers: {
                token,
            },
        }
    );
};

export const deleteCategory = async (token: string, slug: string) => {
    return await axios.delete(
        `${process.env.NEXT_PUBLIC_server_api}/categories/${slug}`,
        {
            headers: {
                token,
            },
        }
    );
};
export const subCategoryOnCategory = async (token: string, _id: string) => {
    return await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/categories/sub-categories/${_id}`,
        {
            headers: {
                token,
            },
        }
    );
};

// export const productByCategory = async (_id) => {
//     return await axios.get(
//         `${process.env.NEXT_PUBLIC_server_api}/products/category/${_id}`
//     );
// };
