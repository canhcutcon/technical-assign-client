/* eslint-disable no-undef */
const path = require('path')
require('dotenv').config({ path: './env.json' })
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  concurrentFeatures: true,
  images: {
    domains: ['ipfs.pantograph.app'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    reactRoot: true,
    images: {
      layoutRaw: true,
    },
  },
  compiler: {
    removeConsole: {
      exclude: ['log'],
    },
    styledComponents: {
      displayName: true,
      ssr: false,
    },
  },
  cleanDistDir: false,
  webpack(config) {
    config.module.rules[3].oneOf.forEach((one) => {
      if (!`${one.issuer?.and}`.includes('_app')) return
      one.issuer.and = [path.resolve(__dirname)]
    })
    return config
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/card',
      },
    ]
  },
}

module.exports = nextConfig
