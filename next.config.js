// next.config.js
const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
module.exports = withLess(withCss({
  /* config options here */
  // cssModules: true,
  // webpack(config, options) {
    
  //   // Further custom configuration here
  //   config.module.rules[0].use.options = {

  //     plugins: [
  //       [
  //         require.resolve('babel-plugin-named-asset-import'),
  //         {
  //           loaderMap: {
  //             svg: {
  //               ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
  //             },
  //           },
  //         },
  //       ],
  //     ],
  //     // This is a feature of `babel-loader` for webpack (not Babel itself).
  //     // It enables caching results in ./node_modules/.cache/babel-loader/
  //     // directory for faster rebuilds.
  //     cacheDirectory: true,
  //     // Don't waste time on Gzipping the cache
  //     cacheCompression: false,
  //   },

  //   config.module.rules.push({
  //     loader: require.resolve('file-loader'),
  //     // Exclude `js` files to keep "css" loader working as it injects
  //     // it's runtime that would otherwise be processed through "file" loader.
  //     // Also exclude `html` and `json` extensions so they get processed
  //     // by webpacks internal loaders.
  //     exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
  //     // options: {
  //     //   name: '[name].[hash:8].[ext]',
  //     // },
  //   },)
  //   console.log(config.module.rules[0])
  //   return config
  // }
}))