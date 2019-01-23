#!/usr/bin/env node
// run npm in every lerna managed sub-package
// see https://github.com/lerna/lerna/issues/1663
const path = require('path')
const proc = require('child_process')
const fs = require('fs').promises
const util = require('util')
const execFile = util.promisify(proc.execFile)
const exec = util.promisify(proc.exec)

async function run() {
    const packages = await getLernaPackages()
    const status = await handlePackages(packages)

    if (!status) {
        process.exit(1)
    }
}

async function getLernaPackages() {
    const args = ['list', '--json'].concat(process.argv.slice(2))
    const program = require.resolve('lerna/cli.js')

    const { stdout } = await execFile(program, args, {
        cwd: path.resolve(__dirname, '../'),
        env: process.env,

    })

    return JSON.parse(stdout)
}

async function handlePackages(packages) {
    let globalStatus = true

    const packageNames = packages.map(p => p.name)

    for (pkgInfo of packages) {
        const pkg = new Package(pkgInfo)

        console.log(`[> salp]\tRunning audit for package "${pkg.name}":`)

        const { error, stdout, stderr } = await pkg.npmAudit(packageNames)

        if (error) {
            globalStatus = false
            console.log('Errored with:')
            console.error(stderr)
        } else {
            console.log(stdout)
        }
    }

    return globalStatus
}

const backup_postfix = '_salp_backup'

class Package {
    constructor(info) {
        this.name = info.name
        this.location = info.location

        this.packageJson = this.location + '/package.json'
    }

    async backupPackageJson() {
        this.backupedPackageJson = this.packageJson + backup_postfix

        await fs.copyFile(this.packageJson, this.backupedPackageJson)
    }

    async restorePackageJson() {
        if (!this.backupedPackageJson) {
            throw new Error('package.json must have been backup\'ed before!')
        }

        await fs.unlink(this.packageJson)
        await fs.rename(this.backupedPackageJson, this.packageJson)
    }

    async removePackagesFromPackageJson(packageNames) {
        let fileContent = await fs.readFile(this.packageJson)
        const packageJsonContent = JSON.parse(fileContent)

        function removeFromPackages(pkgs) {
            if (!pkgs) {
                return pkgs
            }

            packageNames.forEach(pName => {
                if (pkgs[pName]) {
                    delete pkgs[pName]
                }
            })

            return pkgs
        }

        packageJsonContent.dependencies = removeFromPackages(packageJsonContent.dependencies)
        packageJsonContent.devDependencies = removeFromPackages(packageJsonContent.devDependencies)

        fileContent = JSON.stringify(packageJsonContent)
        await fs.writeFile(this.packageJson, fileContent)
    }

    async executeNpmAudit() {
        let output

        try {
            output = await exec('npm audit', {
                cwd: this.location,
                env: process.env
            })
        } catch (e) {
            output = {
                e,
                stderr: e.message
            }
        }

        return output
    }

    async npmAudit(packageNames) {
        await this.backupPackageJson()
        await this.removePackagesFromPackageJson(packageNames)

        const output = await this.executeNpmAudit()

        await this.restorePackageJson()

        return output
    }
}

run()
