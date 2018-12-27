<template>
    <div class="single-choice-content__container">
        <h1>{{ question }}</h1>
        <RadioGroup class="single-choice-content__container__radio-group" v-model="checked">
            <Radio class="single-choice-content__container__radio-group__radio" v-for="{answer} in answers" :label="answer" :key="`single_${answer}`">{{answer}}</Radio>
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
    model: {
        prop: 'answer',
        event: 'change'
    },
    props: {
        question: {
            type: String,
            required: true
        },
        answer: Boolean,
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
    methods: {
        correct(checked) {
            let answeredCorrect = true
            this.answers.forEach(({ answer, correct }) => {
                if ((correct && checked.indexOf(answer) === -1) || (!correct && checked.indexOf(answer) !== -1)) {
                    answeredCorrect = false
                }
            })
            this.$emit('change', answeredCorrect)
        }
    },
    watch: {
        checked(newVal, oldVal) {
            this.correct(newVal)
        }
    },
    mounted() {
        this.correct(this.checked)
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
