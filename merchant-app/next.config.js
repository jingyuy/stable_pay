/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    port: process.env.PORT || 8080,
  },
};

module.exports = nextConfig;
