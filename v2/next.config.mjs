/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["e-commerce-microservice.s3.amazonaws.com"],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
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
