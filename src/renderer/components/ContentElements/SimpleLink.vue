<script>
import { shell } from 'electron'

export default {
    name: 'SimpleLink',
    functional: true,
    props: {
        url: {
            type: String,
            required: true,
            default() {
                return ''
            }
        }
    },
    render(createElement, context) {
        const { props } = context

        return createElement(
            'a',
            {
                staticClass: `contentelement-link`,
                style: {
                    marginTop: 'auto'
                },
                on: {
                    click: () => {
                        shell.openExternal(props.url)
                    }
                }
            },
            props.url
        )
    }
}
</script>
