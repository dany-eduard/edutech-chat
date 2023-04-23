/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiUrl: process.env.API_URL
  }
}

module.exports = nextConfig
