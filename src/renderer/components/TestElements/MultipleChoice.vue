<template>
    <div class="multiple-choice-content__container">
        <h1>{{ question }}</h1>
        <CheckboxGroup class="multiple-choice-content__container__checkbox-group" v-model="checked"
        :min="0" :max="getMaxAnswers">
            <Checkbox class="multiple-choice-content__container__checkbox-group__checkbox" v-for="{answer} in answers" :label="answer" :key="`choice_${answer}`">{{answer}}</Checkbox>
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
    computed: {
        getMaxAnswers() {
            return this.answers.length
        }
    },
    mounted() {
        this.correct(this.checked)
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
