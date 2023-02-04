import axios from "axios";

export const createSubCategory = async (
    token: string,
    subCategoryName: string,
    parent: string
) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/sub-category`,
        { subCategoryName, parent },
        {
            headers: {
                token,
            },
        }
    );
};
export const getAllSubCategories = async () =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/sub-categories`);

export const getSubCategory = async (slug: string) =>
    await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/sub-categories/${slug}`
    );

export const updateSubCategory = async (
    token: string,
    updateSubCategoryName: string,
    parent: string,
    slug: string
) => {
    return await axios.put(
        `${process.env.NEXT_PUBLIC_server_api}/sub-categories/${slug}`,
        { updateSubCategoryName, parent },
        {
            headers: {
                token,
            },
        }
    );
};
export const deleteSubCategory = async (token: string, slug: string) => {
    return await axios.delete(
        `${process.env.NEXT_PUBLIC_server_api}/sub-categories/${slug}`,
        {
            headers: {
                token,
            },
        }
    );
};
