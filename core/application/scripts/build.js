#!/usr/bin/env node
// build and pack the application
const path = require('path')
const fs = require('fs')
const builder = require('electron-builder')
const licenses = require('./build/licenses.js')

const cwd = process.cwd()

const generatedBuildResourcesDir = path.resolve(cwd, 'build/generated')
if (!fs.existsSync(generatedBuildResourcesDir)) {
    fs.mkdirSync(generatedBuildResourcesDir)
}

async function run() {
    console.log('Generating ThirdPartyNotices')
    licenses(path.resolve(generatedBuildResourcesDir, 'ThirdPartyNotices.txt'))

    console.log('Running electron-builder')
    await builder.build()
}

run()
