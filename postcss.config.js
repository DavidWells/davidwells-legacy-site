module.exports = (config, hotLoadedVariables) => [
  // require("stylelint")(),
  require('postcss-cssnext')({ browsers: 'last 2 versions' }),
  // require('postcss-import')({
  //   addDependencyTo: webpack
  // }),
  // require("postcss-reporter")(),
  /* require global variables */
  require('postcss-simple-vars')({
    variables: function variables() {
      return hotLoadedVariables
    },
    onVariables(variables) {
      // console.log(variables)
    },
    unknown: function unknown(node, name, result) {
      node.warn(result, `Unknown variable ${name}`)
    }
  }),
  /* do math with resolve( ) */
  require('postcss-math'),
  // require('cssnano'), breaks keyframes
  /* enable nested css selectors like Sass/Less */
  require('postcss-nested'),
  ...config.production ? [
    require('postcss-browser-reporter')(), // dev
  ] : [], // prod
]
