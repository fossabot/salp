<template>
    <div class="single-choice-content__container">
        <h1>{{ question }}</h1>
        <RadioGroup class="single-choice-content__container__radio-group" v-model="checked">
            <Radio class="single-choice-content__container__radio-group__radio" v-for="{answer} in answers" :label="answer" :key="answer">{{answer}}</Radio>
        </RadioGroup>
    </div>
</template>

<script>
import { RadioGroup, Radio } from 'element-ui'

export default {
    name: 'Singlechoice',
    components: {
        RadioGroup,
        Radio
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
            checked: []
        }
    },
    computed: {
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
.single-choice-content__container {
    margin-top: 1em;

    .single-choice-content__container__radio-group {
        display: flex;
        flex-direction: column;

        .single-choice-content__container__radio-group__radio {
            margin-left: 1em;
            margin-top: .5em;
            width: fit-content;
        }
    }
}
</style>
