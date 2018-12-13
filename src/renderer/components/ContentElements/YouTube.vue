<script>
export default {
    name: 'YouTube',
    functional: true,
    props: {
        url: {
            type: String,
            required: true,
            validator(url) {
                return !!url.match(/^(https:\/\/)(www\.youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/)
            }
        }
    },
    render(createElement, context) {
        const { props } = context

        function processURL(url) {
            let videoId = ''
            if (url.indexOf('https://youtu.be/') !== -1) {
                videoId = url.split('/')[3]
            } else {
                videoId = url.split('=')[1]
            }
            if (videoId.indexOf('&') !== -1) {
                videoId = videoId.split('&')[0]
            }
            return `https://www.youtube-nocookie.com/embed/${videoId}`
        }

        const src = processURL(props.url)

        return createElement(
            'webview',
            {
                staticClass: `contentelement-youtube`,
                attrs: {
                    src,
                    frameborder: 0,
                    allowfullscreen: true
                }
            }
        )
    }
}
</script>

<style lang="scss">
.contentelement-youtube {
    width: 100%;
    height: 34em;
}
</style>
