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
            keywords: this.pkgInfo.keywords
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

    get sanitizedName() {
        return this.name
            .trim()
            .replace(/[^a-zA-Z0-9]/gi, '_')
    }

    get isValid() {
        try {
            return !!(this.path
                && this.name
                && this.resolveContentEntry()
                && this.resolveBackgroundEntry())
        } catch (e) {
            return false
        }
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

    resolveBackgroundEntry() {
        const file = this.pkgInfo['main']

        if (!file) {
            throw new Error('Field \'main\' missing in package.json of course ' + this.name)
        }

        // TODO: implement resolving for external and internal bundled courses!
        return path.join(this.path, file)
    }

    _readPkgInfo() {
        const pkgJson = path.join(this.path, 'package.json')

        return require(pkgJson, [])
    }
}

module.exports = Course
