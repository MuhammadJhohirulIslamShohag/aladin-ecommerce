export const formatValue = (value: string = "") => {
    if (typeof value === "string") {
        return value;
    } else {
        return JSON.stringify(value);
    }
};
