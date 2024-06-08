export const config = {
    baseURL:
        process.env.NEXT_PUBLIC_SERVER_API ||
        "https://aladin-e-commerce-server-monolith.vercel.app/api/v1",
    stripeKey: process.env.NEXT_PUBLIC_STRIPE_KEY,
};
