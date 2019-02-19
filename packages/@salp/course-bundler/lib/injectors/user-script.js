module.exports = options => {
    let code = options.userScript
    code = code ? `require('${code}');` : '/* no user script provided */'

    return { code }
}
