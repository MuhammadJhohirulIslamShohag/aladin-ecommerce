import axios from "axios";

export const createSubCategory = async (
    token: string,
    subCategoryObject: any
) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/subCategories`,
        subCategoryObject,
        {
            headers: {
                token,
            },
        }
    );
};
export const getAllSubCategories = async () =>
    await axios.get(`${process.env.NEXT_PUBLIC_server_api}/subCategories`);

export const getSubCategory = async (slug: string) =>
    await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/subCategories/${slug}`
    );

export const updateSubCategory = async (
    token: string,
    updateSubCategoryObj: any,
    slug: string
) => {
    return await axios.put(
        `${process.env.NEXT_PUBLIC_server_api}/subCategories/${slug}`,
        updateSubCategoryObj,
        {
            headers: {
                token,
            },
        }
    );
};
export const deleteSubCategory = async (token: string, slug: string) => {
    return await axios.delete(
        `${process.env.NEXT_PUBLIC_server_api}/subCategories/${slug}`,
        {
            headers: {
                token,
            },
        }
    );
};
