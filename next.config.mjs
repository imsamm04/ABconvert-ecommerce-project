/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000'
        // pathname: '/photos/**'
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  async rewrites() {
    return [
      {
        source: '/version-a',
        destination: '/',
      },
      {
        source: '/version-b',
        destination: '/',
      },
    ];
  },
}

export default nextConfig
