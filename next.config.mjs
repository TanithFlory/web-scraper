/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  images: {
    domains: ["m.media-amazon.com", "aax-eu.amazon.in"],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth",
      "puppeteer-extra-plugin-recaptcha",
      "puppeteer-extra-plugin-user-preferences",
      "chrome-aws-lambda",
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
