const isProduction = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isProduction ? "/mihoyo-copilot" : undefined,
  assetPrefix: isProduction ? "/mihoyo-copilot" : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "patchwiki.biligame.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
