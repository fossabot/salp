<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    name: 'Icon',
    functional: true,
    render(createElement, context) {
        const { props, parent } = context

        // Check if icon is string and should use from registered icons in parent
        if (props.icon && typeof props.icon === 'string' 
            && parent.$icons && parent.$icons[props.icon]) {
                props.icon = parent.$icons[props.icon]
        }

        return createElement(FontAwesomeIcon, {
            props: context.props,
            staticClass: 'el-icon-fa'
        })
    }
}
</script>