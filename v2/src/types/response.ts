import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Define a type alias that includes the required properties
export type CustomFetchBaseQueryError = FetchBaseQueryError & {
    data: {
        message: string;
    };
};