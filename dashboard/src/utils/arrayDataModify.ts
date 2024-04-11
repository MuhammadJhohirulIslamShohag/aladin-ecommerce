/* eslint-disable @typescript-eslint/no-explicit-any */

const arrayDataToOptions = <T extends Record<string, any>>(
    payload: T[],
    labelName: string,
    property: {
        id: string
        name: string
    },
    value: {
        id: string
        name: string
    }
) => {
    if (Array.isArray(payload)) {
        return payload?.map((item) => ({
            label: item[labelName],
            value: JSON.stringify({
               [property.id]: item[value.id],
               [property.name]: item[value.name],
            }),
        }));
    }
};

export const ArrayDataModifyHelpers = {
    arrayDataToOptions,
};
