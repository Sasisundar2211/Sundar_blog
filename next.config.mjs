/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  pageExtensions: ['ts', 'tsx'],
  experimental: { optimizePackageImports: ['shiki'] },
};
export default nextConfig;
