<template>
    <div class="multiple-choice-content__container">
        <h1>{{ question }}</h1>
        <CheckboxGroup class="multiple-choice-content__container__checkbox-group" v-model="checked"
            :min="0" :max="getMaxAnswers" :disabled="disabled">
            <MultipleChoiceCheckbox
                v-for="({answer}, index) in answers" :question="question" :answer="answer"
                :isValid="isValid[index]" :assignmentName="assignmentName"
                :key="`choice_${index}`"/>
        </CheckboxGroup>
    </div>
</template>

<script>
import { CheckboxGroup } from 'element-ui'
import MultipleChoiceCheckbox from './MultipleChoiceCheckbox.vue'

export default {
    name: 'MultipleChoice',
    components: {
        CheckboxGroup,
        MultipleChoiceCheckbox
    },
    props: {
        assignmentName: {
            type: String,
            required: true
        },
        retry: {
            type: Boolean,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        answers: {
            type: Array,
            required: true,
            validator(answers) {
                if (!Array.isArray(answers) || answers.length === 0) {
                    return false
                }

                const isValidAnswer = entry => entry.hasOwnProperty('answer') && typeof entry.answer === 'string' && entry.answer.length > 0
                const isValidCorrect = entry => entry.hasOwnProperty('correct') && typeof entry.correct === 'boolean'
                const isValidEntry = entry => isValidAnswer(entry) && isValidCorrect(entry)

                return answers.every(isValidEntry)
            }
        }
    },
    data() {
        return {
            checked: [],
            isValid: [],
            disabled: false
        }
    },
    methods: {
        questionIsCorrect() {
            return this.answers.every(({ answer, correct }) => {
                return (correct && this.checked.includes(answer)) || (!correct && !this.checked.includes(answer))
            })
        },
        validateAnswer(answer) {
            // Answer is correct and checked = valid/green
            // Answer is correct and not checked = invalid/red
            // Answer is not correct and checked = invalid/red
            // Answer is not correct and not cheked = undefiend

            const correct = answer.correct
            let isValid = true
            if ((!correct && this.checked.indexOf(answer.answer) !== -1) && !this.retry) {
                isValid = false
            }
            if ((!correct && this.checked.indexOf(answer.answer) === -1)
                || (this.retry && !this.questionIsCorrect())) {
                isValid = undefined
            }
            this.isValid.push(isValid)
        },
        validate() {
            this.isValid = []

            if (!this.retry) {
                this.disabled = true
            }
            this.answers.forEach(answer => {
                this.validateAnswer(answer)
            })
            this.$emit('validated', this.questionIsCorrect())
        }
    },
    computed: {
        getMaxAnswers() {
            return this.answers.length
        }
    }
}
</script>

<style lang="scss">
.multiple-choice-content__container {
    .multiple-choice-content__container__checkbox-group {
        display: flex;
        flex-direction: column;

        .multiple-choice-content__container__checkbox-group__checkbox {
            margin-left: 1em;
            margin-top: 0.5em;
            width: fit-content;
        }
    }
}
</style>
