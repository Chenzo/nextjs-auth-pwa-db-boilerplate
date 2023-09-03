/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['chenzorama.com', 'cdn.discordapp.com'],
  },
  /* webpack(config) {    
    config.resolve.fallback = { 
      fs: false,
      net: false,
      tls: false,
      dns: false,
      "process": false
    };

  return config;
} */}

const withPWA = require('next-pwa')({
    dest: 'public'
})
  
module.exports = withPWA(nextConfig)

