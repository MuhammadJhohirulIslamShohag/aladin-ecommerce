/* eslint-disable @typescript-eslint/no-explicit-any */
import { TImage } from "../types/response";

const arrayDataToOptions = <T extends Record<string, any>>(
    payload: T[],
    labelName: string,
    property: {
        id: string;
        name: string;
    },
    value: {
        id: string;
        name: string;
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

const imageDataModify = (data: string[]): TImage[] => {
    const modifyData = data?.map((imgUrl, index) => ({
        uid: `-${index}`,
        name: `${imgUrl?.substring(imgUrl?.lastIndexOf("/") + 1)}`,
        status: "done" as const,
        url: imgUrl,
        isFromData: true
    }));
    return modifyData?.length ? modifyData : [];
};

export const ArrayDataModifyHelpers = {
    arrayDataToOptions,
    imageDataModify,
};
