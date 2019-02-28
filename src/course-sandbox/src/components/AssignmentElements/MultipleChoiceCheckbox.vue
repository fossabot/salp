<template>
    <Checkbox class="multiple-choice-content__container__checkbox-group__checkbox .piwikContentIgnoreInteraction"
        :class="getValidationClass" :label="answer" @change="handleChange">
        {{ answer }}
    </Checkbox>
</template>

<script>
import { Checkbox } from 'element-ui'

export default {
    name: 'MultipleChoiceCheckbox',
    components: {
        Checkbox
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
            this.$matomo.trackEvent(this.assignmentName + '_assignment', 'mc_' + this.question, '' + this.answer, checked ? 1 : 0)
        }
    }
}
</script>

<style lang="scss">
.multiple-choice-content__container__checkbox-group__checkbox {
    &.is-valid .el-checkbox__label {
        color: $--color-success !important;
    }

    &.is-invalid .el-checkbox__label {
        color: $--color-danger !important;
    }
}
</style>
