const { hostname, port, pathname } = new URL(
  process.env.NEXT_PUBLIC_STRAPI_API_URL
);
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname,
        port,
        pathname: `${pathname}/**`,
      },
      {
        protocol: "http",
        hostname,
        port,
      },
      {
        protocol: "https",
        hostname,
        port,
        pathname: `${pathname}/**`,
      },
      {
        protocol: "https",
        hostname,
        port,
      },
      {
        protocol: "https",
        hostname: "strapi-nextjs-frontend.vercel.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
