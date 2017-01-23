/**
 * Webpack config to generate DLL for faster dev flow
 */
const path = require('path')
const webpack = require('webpack')
const pkg = require('./package')
const outputPath = path.join(__dirname, pkg.dllPlugin.path)
const deps = Object.keys(pkg.dependencies)
const wrap = JSON.stringify

module.exports = {
  context: process.cwd(),
  entry: {
    vendorPackages: deps
  },

  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]',
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(outputPath, '[name].json'),
    }),
    // new webpack.DefinePlugin({ "process.env": {
    //     NODE_ENV: wrap(
    //       true
    //       ? "production"
    //       : process.env.NODE_ENV
    //     ),
    //
    //     PHENOMIC_USER_PATHNAME: wrap("/"),
    //     PHENOMIC_USER_URL: wrap("/"),
    //     PHENOMIC_NAME: wrap(pkg.name[0].toUpperCase() + pkg.name.slice(1)),
    //     PHENOMIC_VERSION: wrap(pkg.version),
    //     PHENOMIC_HOMEPAGE: wrap(pkg.homepage),
    //     PHENOMIC_REPOSITORY: wrap(pkg.repository),
    //   }
    // }),
  ]
}
