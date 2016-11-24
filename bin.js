#!/usr/bin/env node

var spawn = require('child_process').spawn
var join = require('path').join

var fail = function (msg) {
  console.error(msg)
  process.exit(1)
}

var cmd = process.argv[2]
var opts = process.argv.slice(3)

if (cmd === '-v' || cmd === '--version') {
  cmd = 'version'
}

if (cmd === '-h' || cmd === '--help') {
  cmd = 'help'
}

if (cmd === undefined) {
  fail('please specify command')
}

var extend = [
  join(__dirname, 'commands'),
  join(__dirname, 'node_modules', '.bin')
]

process.env.PATH = extend.concat(process.env.PATH.split(':')).join(':')

var ps = spawn(cmd, opts, { stdio: 'inherit' })

ps.on('error', function () {
  fail('cannot find command: ' + cmd)
})

ps.on('exit', process.exit)

