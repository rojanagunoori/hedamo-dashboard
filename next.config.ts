
/** @type {import('next').NextConfig} /
const nextConfig = {
  experimental: {
    turbo: false, // disable Turbopack
  },
};

export default nextConfig;
*/

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icons.veryicon.com",
      },
    ],
  },
};

export default nextConfig;
