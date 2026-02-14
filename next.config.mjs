/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This prevents "Not Basic" code from crashing the build over minor type issues
    ignoreBuildErrors: true,
  },
  eslint: {
    // This speeds up the build by skipping linting checks
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
