// build static courses for development serving
const proc = require('./proc')

async function buildCourse(path) {
    return proc.exec('npm run build', path, {})
}

module.exports = buildCourse
