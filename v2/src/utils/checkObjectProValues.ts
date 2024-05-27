export const checkEveryPropertiesHasValue = (value: {
    [key: string]: unknown;
}) => {
    return value
        ? Object.values(value).every((value) => Boolean(value))
        : false;
};
