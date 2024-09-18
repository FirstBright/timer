/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}
module.exports = {
    target: "serverless",
    trailingSlash: true,
}
export default nextConfig
