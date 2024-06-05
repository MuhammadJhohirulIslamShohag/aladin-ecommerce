/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["e-commerce-microservice.s3.amazonaws.com"],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this with your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ];
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://54.204.167.67/api/v1/:path*',
            },
        ];
    },
};

export default nextConfig;
