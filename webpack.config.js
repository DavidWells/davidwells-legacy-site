/*eslint-disable */
import path from 'path'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import PhenomicFeedWebpackPlugin from 'phenomic/lib/loader-feed-webpack-plugin'
import { phenomicLoader } from 'phenomic'
import pkg from './package.json'
import getSiteConfig from './src/_config'

export const makeConfig = (config = {}) => {
  // console.log('phenomic config', config)
  const isProd = config.production
  const siteConfig = getSiteConfig(isProd)
  const dynamicEnvVariables = {
    NODE_ENV: (isProd) ? '"production"' : '"development"',
    BROWSER: (isProd) ? '"false"' : '"true"',
  }
  const processEnvVariables = Object.keys(siteConfig).reduce((memo, key) => {
    memo[key] = JSON.stringify(siteConfig[key])
    return memo
  }, dynamicEnvVariables)

  //const varsFile = require("./src/_variables.js")
  // const varsFile = (webpackInstance) => {
  //   webpackInstance.addDependency(varsFilePath)
  //   delete require.cache[varsFilePath]
  //   return require(varsFilePath)()
  // }
  const postcssPluginFile = require.resolve("./postcss.config.js")
  const postcssPlugins = (webpackInstance) => {
    const varFile = require.resolve("./src/_variables.js")
    const varFileContents = () => {
      webpackInstance.addDependency(varFile)
      delete require.cache[varFile]
      return require(varFile)()
    }
    webpackInstance.addDependency(postcssPluginFile)
    delete require.cache[postcssPluginFile]
    return require(postcssPluginFile)(config, varFileContents())
  }

  console.log('processEnvVariables', processEnvVariables)
  return {
    ...config.dev && {
      devtool: '#cheap-module-eval-source-map',
    },
    module: {
      noParse: [/\.min\.js/, /autoit.js/, /node_modules\/localforage\/dist\/localforage.js/],
      loaders: [
        {
          // phenomic requirement for loading markdown
          test: /\.md$/,
          loader: phenomicLoader,
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.js$/,
          loaders: [
            `babel-loader${
              config.dev
              ? '?cacheDirectory=true&presets[]=babel-preset-react-hmre' // dev
              : '?cacheDirectory=true' // prod
            }`,
            'eslint-loader?fix',
          ],
          include: [
            path.resolve(__dirname, 'scripts'),
            path.resolve(__dirname, 'src'),
          ],
        },
        {
          test: /@serverless\/ui-components.*.css$/,
          loader: ExtractTextPlugin.extract(
            'style-loader',
            ['css-loader?modules&importLoaders=1&localIdentName=[local]', 'postcss-loader'].join('!'),
          ),
        },
        {
          // *.css => CSS Modules
          test: /\.css$/,
          exclude: [/\.global\.css$/, path.join(__dirname, 'node_modules')],
          include: path.resolve(__dirname, 'src'),
          loader: ExtractTextPlugin.extract(
            'style-loader',
            [`css-loader?modules&importLoaders=1&localIdentName=${
                config.production
                ? '[hash:base64:5]' // prod
                : '[path][name]--[local]--[hash:base64:5]' // dev
              }`,
              'postcss-loader',
            ].join('!'),
          ),
        },
        {
          // *.global.css => global (normal) css
          test: /\.global\.css$/,
          include: path.resolve(__dirname, 'src'),
          loader: ExtractTextPlugin.extract(
            'style-loader',
            ['css-loader', 'postcss-loader'].join('!'),
          ),
        },
        {
          test: /\.(html|ico|jpe?g|png|gif)$/,
          loader: `${'file-loader' +
            '?name=[path][name].[hash].[ext]&context='}${
            path.join(__dirname, config.source)}`,
        },
        {
          test: /\.svg$/,
          loader: 'raw-loader',
        },
      ],
    },
    // Phenomic options
    phenomic: {
      context: path.join(__dirname, config.source),
      defaultHead: {
        layout: 'Post',
        comments: true,
      }
    },

    postcss: postcssPlugins,

    plugins: [
      // possible perf upgrade for local dev
      // new webpack.DllReferencePlugin({
      //    context: process.cwd(),
      //    manifest: require(path.resolve(pkg.dllPlugin.path, 'vendorPackages.json'))
      // }),
      new PhenomicFeedWebpackPlugin({
        // here you define generic metadata for your feed
        feedsOptions: {
          title: 'Serverless Blog',
          site_url: pkg.homepage,
        },
        feeds: {
          // here we define one feed, but you can generate multiple, based
          // on different filters
          'blog/feed.xml': {
            // here you can define options for the feed
            title: `${pkg.name}: Latest Posts`,

            // this special key allows to filter the collection
            collectionOptions: {
              filter: { layout: 'Post' },
              sort: 'date',
              reverse: true,
              limit: 20,
            },
          },
        },
      }),
      new ExtractTextPlugin('[name].[hash].css', { disable: config.dev }),
      ...config.production && [
        new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin(
        //   { compress: { warnings: false } }
        // ),
      ],
      new webpack.DefinePlugin({
        // set 'process.env.[vars]'
        'process.env': processEnvVariables,
        // Auth0Lock: 'Auth0Lock',
        // 'window.Auth0Lock': 'Auth0Lock'
      }),
      // Copy external files to /dist
      // new CopyWebpackPlugin([
      //   {
      //     from: 'admin',
      //     to: 'admin'
      //   },
      // ]),
    ],
    // externals: {
    //   // Use external version of React
    //   'Auth0Lock': 'Auth0Lock',
    // },
    output: {
      path: path.join(__dirname, config.destination),
      publicPath: config.baseUrl.pathname,
      filename: '[name].[hash].js',
    },
    resolve: {
      extensions: ['.js', '.json', ''],
      root: [path.join(__dirname, 'node_modules')],
      // alias: {
      //   'assets': 'src/assets',
      //   'utils': 'src/utils',
      //   'components': 'src/components',
      //   'fragments': 'src/fragments',
      //   'layouts': 'src/layouts',
      // }
    },
    resolveLoader: {
      root: [path.join(__dirname, 'node_modules')]
    },
  }
}
