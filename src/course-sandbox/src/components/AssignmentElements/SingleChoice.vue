<template>
    <div class="single-choice-content__container">
        <h1>{{ question }}</h1>
        <RadioGroup class="single-choice-content__container__radio-group" v-model="checked" :disabled="disabled">
            <SingleChoiceRadiobutton v-for="({answer, $isValid}, index) in answers" :isValid="isValid[index]"
                :key="`single_${index}`" :question="question" :answer="answer" :assignmentName="assignmentName">
                {{ answer }}
            </SingleChoiceRadiobutton>
        </RadioGroup>
    </div>
</template>

<script>
import { RadioGroup } from 'element-ui'
import SingleChoiceRadiobutton from './SingleChoiceRadiobutton.vue'

export default {
    name: 'Singlechoice',
    components: {
        RadioGroup,
        SingleChoiceRadiobutton
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

                const isValidEntry = entry => isValidAnswer(entry) && isValidCorrect(entry)
                const isValidAnswer = entry => entry.hasOwnProperty('answer') && typeof entry.answer === 'string' && entry.answer.length > 0
                const isValidCorrect = entry => entry.hasOwnProperty('correct') && typeof entry.correct === 'boolean'

                let correctAnswersCounter = 0
                let isValid = true
                answers.forEach(entry => {
                    if (!isValidEntry(entry)) {
                        isValid = false
                    }
                    if (entry.correct) {
                        correctAnswersCounter++
                        if (correctAnswersCounter > 1) {
                            isValid = false
                        }
                    }
                })

                return isValid
            }
        }
    },
    data() {
        return {
            checked: '',
            isValid: [],
            disabled: false
        }
    },
    methods: {
        questionIsCorrect() {
            return this.answers.every(({ answer, correct }) => {
                return (correct && this.checked === answer) || (!correct && this.checked !== answer)
            })
        },
        validateAnswer(answer) {
            // Answer is correct and checked = valid/green
            // Answer is correct and not checked = invalid/red
            // Answer is not correct and checked = invalid/red
            // Answer is not correct and not cheked = undefiend

            const correct = answer.correct
            let isValid = true
            if ((!correct && this.checked === answer.answer) && !this.retry) {
                isValid = false
            }
            if ((!correct && this.checked !== answer.answer)
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

            if (this.retry && this.questionIsCorrect()) {
                this.disabled = true
            }

            this.$emit('validated', this.questionIsCorrect())
        }
    }
}
</script>

<style lang="scss">
.single-choice-content__container {
    .single-choice-content__container__radio-group {
        display: flex;
        flex-direction: column;

        .single-choice-content__container__radio-group__radio {
            margin-left: 1em;
            margin-top: 0.5em;
            width: fit-content;
        }
    }
}
</style>
