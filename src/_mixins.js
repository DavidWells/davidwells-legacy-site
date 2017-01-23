/* Global Mixins for use in CSS and JS */
// media queries http://codepen.io/davidgilbertson/pen/aBpJzO
module.exports = {
  /* Disable selectable text */
  noSelect: {
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none'
  },
  OpenSans: {
    'font-family': 'Open Sans, sans-serif',
    'font-style': 'normal',
    'font-weight': 400,
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  // Function example
  image(mixin, path) {
    return {
      '&': {
        background: `url(${path})`
      },
      '@media (min-resolution: 120dpi)': {
        '&': {
          background: `url(${path}@2x)`
        }
      }
    }
  }
}
