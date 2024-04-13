/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFile } from "antd";
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

const imageStringArrayToObjectModify = (data: string[]): TImage[] => {
    const modifyData = data?.map((imgUrl, index) => ({
        uid: `-${index}`,
        name: `${imgUrl?.substring(imgUrl?.lastIndexOf("/") + 1)}`,
        status: "done" as const,
        url: imgUrl,
        isFromData: true,
    }));
    return modifyData?.length ? modifyData : [];
};

const imageObjectArrayToStringModify = (data: UploadFile[]): string[] => {
    const modifyData = data
        .filter((item) => !item?.originFileObj)
        .map((item) => item.url!);

    return modifyData?.length ? modifyData : [];
};

export const ArrayDataModifyHelpers = {
    arrayDataToOptions,
    imageStringArrayToObjectModify,
    imageObjectArrayToStringModify,
};
