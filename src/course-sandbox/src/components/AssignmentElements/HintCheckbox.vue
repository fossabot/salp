<template>
    <Checkbox class="hint__checkbox .piwikContentIgnoreInteraction"
              :label="hint">
        {{ hint }}
    </Checkbox>
</template>

<script>
import { Checkbox } from 'element-ui'

export default {
    name: 'HintCheckbox',
    components: {
        Checkbox
    },
    props: {
        assignmentName: {
            type: String,
            required: true
        },
        hint: {
            type: String,
            required: true
        },
        retries: {
            type: Number,
            required: true
        }
    },
    methods: {
        handleChange(checked) {
            this.$matomo.trackEvent(this.assignmentName + '_assignment', 'hint_' + this.retries, '' + this.hint, checked ? 1 : 0)
        }
    }
}
</script>
