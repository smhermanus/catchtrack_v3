/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  experimental: {
    serverComponentsExternalPackages: ['pg']
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiTimeout: 60 // in seconds
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/en/dashboards/catchtrack',
        permanent: true,
        locale: false
      },
      {
        source: '/:lang(en|fr|ar)',
        destination: '/:lang/dashboards/catchtrack',
        permanent: true,
        locale: false
      },
      {
        source: '/((?!(?:en|fr|ar|front-pages|favicon.ico)\\b)):path',
        destination: '/en/:path',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
