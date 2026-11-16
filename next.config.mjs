/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  pageExtensions: ['ts', 'tsx'],
  experimental: { optimizePackageImports: ['shiki'] },
  // The lead route attaches the guide PDF, so ship it inside the function bundle.
  outputFileTracingIncludes: { '/api/**': ['./public/guides/**/*'] },
};
export default nextConfig;
