<script>
import { remote } from 'electron'
const { shell } = remote

export default {
    name: 'ExternalLink',
    functional: true,
    props: {
        href: {
            type: String,
            required: true
        }
    },
    render(createElement, { props, children }) {
        return createElement('a', {
            domProps: {
                href: props.href
            },
            on: {
                click(event) {
                    event.preventDefault()

                    const href = event.target.href
                    shell.openExternal(href)
                }
            }
        }, children)
    }
}
</script>
