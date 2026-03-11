// /** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')()

const config = withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.realworld.io',
      },
      {
        protocol: 'https',
        hostname: 'static.productionready.io',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
})

module.exports = config
