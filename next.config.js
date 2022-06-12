module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL
  },
  images:{
    domains: ['ecommerce-taco.s3.us-east-2.amazonaws.com',
              'lh3.googleusercontent.com',
              'upload.wikimedia.org',
              'cdn.pngsumo.com'
             ]
  },
  experimental: {
    outputStandalone: true
  }
}
