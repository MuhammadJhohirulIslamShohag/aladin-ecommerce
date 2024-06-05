const { NEXT_PUBLIC_SERVER_API, NEXT_PUBLIC_stripe_key } = process.env;

export const config = {
    baseURL: NEXT_PUBLIC_SERVER_API || "/api",
    stripeKey: NEXT_PUBLIC_stripe_key || ""
};
