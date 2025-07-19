/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'i.imgur.com', 'i.ibb.co'], // <-- ADD 'i.ibb.co'
  },
}

module.exports = nextConfig