const { NEXT_PUBLIC_SERVER_API, NEXT_PUBLIC_stripe_key } = process.env;

export const config = {
    baseURL: NEXT_PUBLIC_SERVER_API || "http://54.204.167.67/api/v1",
    stripeKey: NEXT_PUBLIC_stripe_key || ""
};
