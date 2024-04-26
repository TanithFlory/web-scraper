/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  images: {
    domains: ["m.media-amazon.com"],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth",
      "puppeteer-extra-plugin-recaptcha",
    ],
  },
};

export default nextConfig;
