module.exports = options => {
    let code = options.userScript
    code = code ? `export { default } from '${code}'` : '/* no user script provided */'

    return { code }
}
