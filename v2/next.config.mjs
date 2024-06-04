/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["e-commerce-microservice.s3.amazonaws.com"],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
