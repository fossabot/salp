<template>
    <div class="multiple-choice-content__container">
        <h1>{{ question }}</h1>
        <CheckboxGroup class="multiple-choice-content__container__checkbox-group" v-model="checked"
        :min="0" :max="getMaxAnswers">
            <Checkbox class="multiple-choice-content__container__checkbox-group__checkbox" v-for="{answer} in answers" :label="answer" :key="answer">{{answer}}</Checkbox>
        </CheckboxGroup>
    </div>
</template>

<script>
import { CheckboxGroup, Checkbox } from 'element-ui'

export default {
    name: 'Multiplechoice',
    components: {
        CheckboxGroup,
        Checkbox
    },
    props: {
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

                let isValid = true
                answers.forEach(entry => {
                    if (!isValidEntry(entry)) {
                        isValid = false
                    }
                })

                return isValid
            }
        }
    },
    data() {
        return {
            checked: []
        }
    },
    computed: {
        getMaxAnswers: function() {
            return this.answers.length
        },
        correct: function() {
            let answeredCorrect = true
            this.answers.forEach(({ answer, correct }) => {
                if ((correct && this.checked.indexOf(answer) === -1) || (!correct && this.checked.indexOf(answer) !== -1)) {
                    answeredCorrect = false
                }
            })
            return answeredCorrect
        }
    }
}
</script>

<style lang="scss">
.multiple-choice-content__container {
    margin-top: 1em;

    .multiple-choice-content__container__checkbox-group {
        display: flex;
        flex-direction: column;

        .multiple-choice-content__container__checkbox-group__checkbox {
            margin-left: 1em;
            margin-top: .5em;
            width: fit-content;
        }
    }
}
</style>
