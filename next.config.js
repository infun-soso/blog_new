// next.config.js
const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
module.exports = withLess(withCss({
  /* config options here */
  // cssModules: true,
  webpack(config, options) {
    config.module.rules.push({
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
      loader: require.resolve('url-loader'),
      options: {
        limit: 10000,
        name: '[name].[hash:8].[ext]',
        outputPath: 'static/imgs/',
        publicPath: '/_next/static/imgs',
      },
    },)
    return config
  }
}))