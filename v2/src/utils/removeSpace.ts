export const removeSpace = (name: string) => {
    const removeSpace = name?.replace(/\s/g, "_");
    return removeSpace;
};