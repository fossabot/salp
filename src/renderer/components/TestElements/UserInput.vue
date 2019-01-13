<template>
    <div class="user-input__container" v-bind:class="{left: isLeftPosition, top: isTopPosition}">
        <h1 class="user-input__container__text">{{ question }}</h1>
        <Input class="user-input__container__input"
            v-model="answer" placeholder="Insert Answer"
            :disabled="disabled" :class="{ 'is-valid': correct === true, 'is-invalid': correct === false }"/>
    </div>
</template>

<script>
import { Input } from 'element-ui'

export default {
    name: 'UserInput',
    components: {
        Input
    },
    props: {
        question: {
            type: String,
            required: true
        },
        questionPosition: {
            type: String,
            default() {
                return 'top'
            }
        },
        answers: {
            type: Array,
            required: true,
            validator(answers) {
                if (!Array.isArray(answers) || answers.length === 0) {
                    return false
                }

                const isValidAnswer = entry => entry.hasOwnProperty('answer') && typeof entry.answer === 'string' && entry.answer.length > 0

                let isValid = true
                answers.forEach(entry => {
                    if (!isValidAnswer(entry)) {
                        isValid = false
                    }
                })

                return isValid
            }
        }
    },
    data() {
        return {
            answer: '',
            disabled: false,
            correct: undefined
        }
    },
    computed: {
        isLeftPosition() {
            return this.questionPosition === 'left' || this.questionPosition === 'Left'
        },
        isTopPosition() {
            return this.questionPosition === 'top' || this.questionPosition === 'Top'
        }
    },
    methods: {
        questionIsCorrect() {
            let correct = false
            this.answers.forEach(({ answer }) => {
                if (answer === this.answer.trim()) {
                    correct = true
                }
            })
            return correct
        },
        validate() {
            this.disabled = true
            this.correct = this.questionIsCorrect()
            this.$emit('validated', this.correct)
        }
    }
}
</script>

<style lang="scss">
.user-input__container {
    display: flex;

    &.left {
        flex-direction: row;
    }

    &.top {
        flex-direction: column;
    }

    .user-input__container__input {
        width: fit-content;
        margin-left: 1em;

        &.is-valid input {
            color: $--color-success !important;
        }

        &.is-invalid input {
            color: $--color-danger !important;
        }
    }
}
</style>
