import { baseApi } from "../../api/baseApi";

const authApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation({
            query: (payload) => ({
                url: "auth/create-user",
                method: "POST",
                body: payload,
            }),
        }),
        login: build.mutation({
            query: (payload) => ({
                url: `/auth/login-user`,
                method: "POST",
                credentials: "include",
                body: payload,
            }),
        }),
        verifyOTP: build.mutation({
            query: (payload) => ({
                url: `/auth/create-user/verified`,
                method: "POST",
                body: payload,
            }),
        }),
        forgotPassword: build.mutation({
            query: (payload) => ({
                url: `/auth/forgot-password`,
                method: "POST",
                body: payload,
            }),
        }),
        resetPassword: build.mutation({
            query: (payload) => ({
                url: `/auth/reset-password`,
                method: "POST",
                body: payload,
            }),
        }),
        resendOTP: build.mutation({
            query: (payload) => ({
                url: `/auth/resend-otp`,
                method: "POST",
                body: payload,
            }),
        }),
        changePassword: build.mutation({
            query: ({ data, token }) => ({
                url: `/auth/change-password`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        updateProfile: build.mutation({
            query: ({ id, data, token }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        addShippingAddress: build.mutation({
            query: ({ data, token }) => ({
                url: "users/add-shipping-address",
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        refreshToken: build.mutation({
            query: (payload) => ({
                url: `auth/refresh-token`,
                method: "POST",
                credentials: "include",
                body: payload,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateUserMutation,
    useLoginMutation,
    useVerifyOTPMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useResendOTPMutation,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    useAddShippingAddressMutation,
    useRefreshTokenMutation,
} = authApiService;
