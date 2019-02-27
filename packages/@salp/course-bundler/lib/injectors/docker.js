module.exports = options => {
    let code = options.docker || {}
    code = `export default ${JSON.stringify(code)}`

    return { code }
}
