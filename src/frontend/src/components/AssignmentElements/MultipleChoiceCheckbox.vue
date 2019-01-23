<template>
    <Checkbox class="multiple-choice-content__container__checkbox-group__checkbox"
        :class="getValidationClass" :label="answer">
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
