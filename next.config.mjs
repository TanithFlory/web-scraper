/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  images: {
    domains: ["m.media-amazon.com", "aax-eu.amazon.in"],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "puppeteer-extra",
      "puppeteer-core",
      "puppeteer-extra-plugin-stealth",
      "puppeteer-extra-plugin-recaptcha",
      "puppeteer-extra-plugin-user-preferences",
      "@sparticuz/chromium",
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
