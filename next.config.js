/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dejagifts.sanity.io'],
  },
};

module.exports = nextConfig;

module.exports = {
  images: {
    loader: 'imgix',
    path: '/',
  },
};
