module.exports = options => {
    let code = options.backgroundScript
    code = code ? `require('${code}');` : '/* no background script provided */'

    return { code }
}
