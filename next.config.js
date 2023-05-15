module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL
  },
  images: {
    domains: ['ecommerce-taco.s3.us-east-2.amazonaws.com',
      'lh3.googleusercontent.com',
      'upload.wikimedia.org',
      'cdn.pngsumo.com',
      'cdn.wapizima.com',
      'encrypted-tbn0.gstatic.com',
      'cloud.wapizima.com'
    ],
    deviceSizes: [400, 750, 828, 1000, 1400],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    outputStandalone: true
  }
}
