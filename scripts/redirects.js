/**
 * Handle site redirects
 *
 */
const path = require('path')
const copyFiles = require('./utils/copy-files')
const redirectFile = path.join(__dirname, '..', 'src', '_redirects')
const destinationPath = path.join(__dirname, '..', 'dist', '_redirects')

copyFiles(redirectFile, destinationPath)
