const path = require('path')
const watch = require('watch')
const exec = require('child_process').exec
const cwd = process.cwd()
// const execSync = require('child_process').execSync
// var child = execSync('ls', { encoding: 'utf-8' }).trim();
const serverlessDocs = path.join(__dirname, '..', '..', 'serverless-blog', 'posts')

watch.createMonitor(serverlessDocs, (monitor) => {
  monitor.on('created', (f, stat) => {
    // Handle new files
  })
  monitor.on('changed', (f, curr, prev) => {
    // Handle file changes
    console.log('changed file', f)

    const command = 'npm run prepareContent'
    const child = exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.warn(error)
      }
      console.log(stdout)
      console.log('Built components for consumer app')
    })
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })
    child.stderr.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })
    child.on('close', (code) => {
      console.log(`closing code: ${code}`)
    })
    // trigger pipepline
  })
  monitor.on('removed', (f, stat) => {
    // Handle removed files
  })
  // monitor.stop(); // Stop watching
})
