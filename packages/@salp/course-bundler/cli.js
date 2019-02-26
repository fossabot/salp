#!/usr/bin/env node
// salp course bundler
// Usage:   course [output] [--inspect]
//  - output        optional: output directory, overwrites output setting in config
//  - --inspect     when this flag is provided, the webpack config is printed to stdout, rather than
//                  creating the bundle
//
const bundler = require('./lib/course-bundler')

// parse args
const argv = process.argv.slice(2)
const inspectIndex = argv.indexOf('--inspect')
const isInspect = inspectIndex !== -1
if (isInspect) argv.splice(isInspect)
const outputDir = argv[0] || false

const projectDir = process.cwd()

if (isInspect) {
    bundler.inspect(projectDir, outputDir)
    process.exit(0)
}

bundler(projectDir, outputDir)
