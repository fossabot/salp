<template>
    <Card class="test-content__container">
        <h1>SQL-Injection</h1>
        <Steps :active="currentQuestion" finish-status="success">
            <Step v-for="(question, index) in questions" :key="`step${index}`"/>
        </Steps>
            <div class="test-content__container__question-container">
                <component v-for="(question, index) in questions"
                :key="`question${index}`" :is="question.component"
                :question="question.question" :answers="question.answers"
                v-model="question.answer" v-show="index === currentQuestion">
                </component>
            </div>
        <div class="test-content__container__button-container">
            <Button class="test-content__container__button-container__button" type="primary" @click="next">Check</Button>
        </div>
    </Card>
</template>

<script>
import { Card, Button, Steps, Step } from 'element-ui'
import MultipleChoice from '../../TestElements/MultipleChoice.vue'
import SingleChoice from '../../TestElements/SingleChoice.vue'
import UserInput from '../../TestElements/UserInput.vue'

export default {
    name: 'Test',
    components: {
        Card,
        Button,
        Steps,
        Step,

        MultipleChoice,
        SingleChoice,
        UserInput
    },
    data() {
        return {
            questions: [
                {
                    component: 'MultipleChoice',
                    question: 'Lorem?',
                    answers: [
                        { answer: 'dollor', correct: false },
                        { answer: 'sit', correct: false },
                        { answer: 'atmet', correct: true }
                    ],
                    answer: undefined
                },
                {
                    component: 'SingleChoice',
                    question: 'Ipsum?',
                    answers: [
                        { answer: 'Lorem', correct: false },
                        { answer: 'Sit', correct: true },
                        { answer: 'Lorem Ipsum', correct: false }
                    ],
                    answer: undefined
                },
                {
                    component: 'UserInput',
                    question: 'Lorem Ipsum?',
                    answer: undefined
                },
                {
                    component: 'UserInput',
                    question: 'Dollor sit atmet?',
                    answer: undefined
                }
            ],
            currentQuestion: 0,
            passedAt: 0.5
        }
    },
    computed: {
        passed() {
            let totalQuestions = this.questions.length
            let correctQuestions = 0
            this.questions.forEach(question => {
                if (question.answer === true) {
                    correctQuestions++
                }
            })
            let correctPercentage = (correctQuestions / totalQuestions)
            return correctPercentage >= this.passedAt
        }
    },
    methods: {
        next() {
            this.currentQuestion++
            if (this.currentQuestion >= this.questions.length) {
                return this.passed
            }
        }
    }
}
</script>

<style lang="scss">
.test-content__container__question-container {
    margin-top: 1em;
    display: flex;
    justify-content: center;
}

.test-content__container__button-container {
    display: flex;
    justify-content: center;
    margin-top: 1em;
}
</style>
