const { protocol, hostname, port, pathname } = new URL(
  process.env.NEXT_PUBLIC_STRAPI_API_URL
);

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: protocol.slice(0, -1),
        hostname,
        port,
        pathname: `${pathname}/**`,
      },
      {
        protocol: protocol.slice(0, -1),
        hostname,
        port,
      },
    ],
  },
};

export default nextConfig;
