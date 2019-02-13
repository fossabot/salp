// include actual course content
export default async function CourseContent() {
    const contentScript = await import(
        /* webpackChunkName: 'course-content' */
        /* webpackMode: 'lazy' */
        /* webpackPrefetch: true */
        'content.js'
    )

    const chapters = contentScript.default

    return {
        name: 'CourseContent',
        render(createElement) {
            const chaptersElements = Object.values(chapters).map(createElement)

            return createElement('div', chaptersElements)
        }
    }
}
