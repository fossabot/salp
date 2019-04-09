<template>
    <div class="assignment-content__button-container">
        <Button class="assignment-content__button-container__button .piwikContentIgnoreInteraction"
                :disabled="disabled" type="primary" @click="handleButtonClick">{{ buttonText }}</Button>
    </div>
</template>

<script>
import { Button } from 'element-ui'

export default {
    name: 'Controls',
    props: {
        assignmentState: {
            type: String,
            required: true
        },
        assignmentName: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            required: true
        }
    },
    components: {
        Button
    },
    computed: {
        buttonText() {
            switch (this.assignmentState) {
                case 'NOT_STARTED':
                    return this.$t('Assignment.button.start')
                case 'FINISHED':
                    return this.$t('Assignment.button.result')
                case 'NEXT_QUESTION':
                    return this.$t('Assignment.button.next')
                case 'ANSWERING':
                    return this.$t('Assignment.button.check')
                case 'ANSWERING_RETRY':
                    return this.$t('Assignment.button.retry')
                default:
                    return ''
            }
        }
    },
    methods: {
        handleButtonClick() {
            this.$matomo.trackEvent(this.assignmentName + '_assignment', 'clicked', '' + this.buttonText)
            this.$emit('buttonClick')
        }
    }
}
</script>
