import env_variables from "./environment.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: env_variables,
};

export default nextConfig;
