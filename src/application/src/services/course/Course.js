const path = require('path')

class Course {
    constructor(path) {
        this.path = path

        // hydrate info
        this.pkgInfo = this._readPkgInfo() || {}
        this.info = {
            name: this.pkgInfo.name,
            description: this.pkgInfo.description,
            version: this.pkgInfo.version,
            author: this.pkgInfo.author,
            keywords: this.pkgInfo.keywords,
            repositoryUrl: (this.pkgInfo.repository || {}).url,
            homepage: this.pkgInfo.homepage,
            issuesUrl: this.pkgInfo.bugs
        }
    }

    // info getters
    get id() {
        return this.name
    }

    get name() {
        return this.info.name
    }

    get description() {
        return this.info.description
    }

    get version() {
        return this.info.version
    }

    get author() {
        return this.info.author
    }

    get keywords() {
        return this.info.keywords
    }

    get repositoryUrl() {
        return this.info.repositoryUrl
    }

    get homepage() {
        return this.info.homepage
    }

    get issuesUrl() {
        return this.info.issuesUrl
    }

    get sanitizedName() {
        return this.name
            .trim()
            .replace(/[^a-zA-Z0-9]/gi, '_')
    }

    get isValid() {
        try {
            return !!(this.path
                && this.name
                && this.resolveContentEntry())
        } catch (e) {
            return false
        }
    }

    // meta information
    get dir() {
        return this.path
    }

    // methods
    resolveContentEntry() {
        const file = this.pkgInfo['browser']

        if (!file) {
            throw new Error('Field \'browser\' missing in package.json of course ' + this.name)
        }

        // TODO: implement resolving for external and internal bundled courses!
        return path.join(this.path, file)
    }

    _readPkgInfo() {
        const pkgJson = path.join(this.path, 'package.json')

        return require(pkgJson, [])
    }

    /**
     * Converts this object to a simple representation which can be used for IPC
     */
    toSimple() {
        const data = {
            ...this.info
        }

        data.id = this.id

        return data
    }
}

module.exports = Course
