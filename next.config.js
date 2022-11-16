/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.com',
        port: '',
        pathname: '/docs/images/**',
      },
    ],
  },
}

module.exports = nextConfig
