const markdown = require('./markdown')

module.exports = function markdownLoader(src) {
    // TODO: implement caching
    const { html } = markdown.render(src)

    const name = this.resourcePath
        .slice(this.rootContext.length + 1)
        .replace('/', '--')
        .replace('.md', '')

    // TODO: implement link handling
    // TODO: implement file resolving

    return (
        `<template functional>
            <article id="${name}" class="course-content">${html}</article>
        </template>`
    )
}
