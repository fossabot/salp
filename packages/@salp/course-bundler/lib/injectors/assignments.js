module.exports = options => {
    let code = options.assignments || {}
    code = `export default ${JSON.stringify(code)}`

    return { code }
}
