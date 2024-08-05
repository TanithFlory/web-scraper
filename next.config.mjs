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
    ],
    serverMinification: false,
  },
  reactStrictMode: false,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // add externals
    config.externals = config.externals || [];
    config.externals.push(
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth",
      "puppeteer-extra-plugin-user-preferences"
    );

    return config;
  },
};

export default nextConfig;
