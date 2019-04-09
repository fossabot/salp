<template>
    <Radio class="single-choice-content__container__radio-group__radio .piwikContentIgnoreInteraction"
        :label="answer" :class="getValidationClass" @change="handleChange">
        {{ answer }}
    </Radio>
</template>

<script>
import { Radio } from 'element-ui'

export default {
    name: 'SingleChoiceRadiobutton',
    components: {
        Radio
    },
    props: {
        assignmentName: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        isValid: Boolean
    },
    computed: {
        getValidationClass() {
            if (this.isValid === true) {
                return 'is-valid'
            }
            if (this.isValid === false) {
                return 'is-invalid'
            }
            if (this.isValid === undefined) {
                return 'is-validUnchecked'
            }

            return ''
        }
    },
    methods: {
        handleChange(checked) {
            this.$matomo.trackEvent(this.assignmentName + '_assignment', 'sc_' + this.question, '' + checked)
        }
    }
}
</script>

<style lang="scss">
.single-choice-content__container__radio-group__radio {
    &.is-valid .el-radio__label {
        color: $--color-success !important;
    }

    &.is-invalid .el-radio__label {
        color: $--color-danger !important;
    }
}
</style>
