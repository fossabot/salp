<template>
    <Radio class="single-choice-content__container__radio-group__radio"
        :label="answer" :class="getValidationClass" >
        {{answer}}
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
.single-choice-content__container__radio-group__radio {
    &.is-valid .el-radio__label {
        color: $--color-success !important;
    }

    &.is-invalid .el-radio__label {
        color: $--color-danger !important;
    }
}
</style>
