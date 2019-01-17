<script>
import { shell } from 'electron'

export default {
    name: 'SimpleLink',
    functional: true,
    props: {
        href: {
            type: String,
            required: true
        }
    },
    render(createElement, context) {
        const { props, children } = context

        return createElement(
            'a',
            {
                staticClass: `contentelement-link`,
                on: {
                    click: () => {
                        shell.openExternal(props.href)
                    }
                }
            },
            children
        )
    }
}
</script>

<style lang="scss">
.contentelement-link {
    margin-top: auto;

    &:hover {
        cursor: pointer;
    }
}
</style>
