<script>
import Assignment from './Assignment.vue'

export default {
    name: 'DynamicAssignment',
    functional: true,
    props: {
        id: [String, Number]
    },
    components: {
        Assignment
    },
    render(createElement, { parent, props }) {
        const assignment = parent.assignments[props.id]

        return createElement(Assignment, {
            props: {
                name: props.id,
                questions: assignment.questions,
                retry: assignment.retry,
                passedAt: assignment.passedAt
            }
        })
    }
}
</script>
