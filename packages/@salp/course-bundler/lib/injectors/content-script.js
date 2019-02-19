module.exports = options => {
    let code = options.contentScript
    code = code ? `require('${code}');` : '/* no content script provided */'

    return { code }
}
