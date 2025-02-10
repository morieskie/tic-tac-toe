import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/tic-tac-toe" : "";
const nextConfig: NextConfig = {
  /* config options here */
  basePath,
  // output: "export",
  assetPrefix: isProd ? "/tic-tac-toe" : "",
  env: {
    basePath,
  },
};

export default nextConfig;
