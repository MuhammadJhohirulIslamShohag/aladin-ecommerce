export const config = {
    baseURL: process.env.NEXT_PUBLIC_SERVER_API || "/api",
    stripeKey: process.env.NEXT_PUBLIC_STRIPE_KEY || ""
};
