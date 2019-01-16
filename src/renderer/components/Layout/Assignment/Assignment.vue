<template>
    <Card class="assignment-content__container">
        <h1>SQL-Injection</h1>
        <Steps :active="currentQuestion">
            <Step v-for="(question, index) in questions" :key="`step${index}`"
                :status="question.$correct ? 'success' : question.$correct === false ? 'error' : 'process'"/>
        </Steps>
            <div class="assignment-content__question-container">
                <component v-for="(question, index) in questions"
                    :key="`question_${index}`" :ref="`question_${index}`" :is="question.component"
                    :question="question.question" :answers="question.answers"
                    v-show="index === currentQuestion"
                    @validated="handleQuestionValidated">
                </component>
            </div>
        <div v-if="showResult" class="assignment-content__result-container">
            <h3 v-if="passed">{{ $t('Layout.Assignment.result.passed') }}</h3>
            <h3 v-else>{{ $t('Layout.Assignment.result.failed') }}</h3>
        </div>
        <div v-if="!showResult" class="assignment-content__button-container">
            <Button class="assignment-content__button-container__button" type="primary" @click="handleButtonClick">{{ buttonText }}</Button>
        </div>
    </Card>
</template>

<script>
import { Card, Button, Steps, Step } from 'element-ui'
import MultipleChoice from '../../AssignmentElements/MultipleChoice.vue'
import SingleChoice from '../../AssignmentElements/SingleChoice.vue'
import UserInput from '../../AssignmentElements/UserInput.vue'
import { questions } from '@/__mocks__/assignment/questions.js'

export default {
    name: 'Assignment',
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
            questions: questions,
            buttonText: this.$t('Layout.Assignment.button.check'),
            currentQuestion: 0,
            passedAt: 0.5,
            validate: true,
            showResult: false
        }
    },
    computed: {
        passed() {
            let totalQuestions = this.questions.length
            let correctQuestions = 0
            this.questions.forEach(question => {
                if (question.$correct === true) {
                    correctQuestions++
                }
            })
            let correctPercentage = (correctQuestions / totalQuestions)

            return correctPercentage >= this.passedAt
        }
    },
    methods: {
        handleButtonClick() {
            if (this.validate) {
                this.buttonText = this.$t('Layout.Assignment.button.next')
                this.$refs[`question_${this.currentQuestion}`][0].validate()

                if (this.currentQuestion === this.questions.length - 1) {
                    this.buttonText = this.$t('Layout.Assignment.button.result')
                }
            } else {
                this.currentQuestion++
                if (this.currentQuestion >= this.questions.length) {
                    this.showResult = true

                    return this.passed
                }

                this.buttonText = this.$t('Layout.Assignment.button.check')
                this.validate = true
            }
        },
        handleQuestionValidated(result) {
            this.questions[this.currentQuestion].$correct = result
            this.validate = false
        }
    }
}
</script>

<style lang="scss">
.assignment-content__container {
    .assignment-content__question-container {
        margin-top: 1em;
        display: flex;
        justify-content: center;
    }

    .assignment-content__button-container {
        display: flex;
        justify-content: center;
        margin-top: 1em;
    }

    .assignment-content__result-container {
        margin-top: 2em;
        display: flex;
        justify-content: center;
    }
}
</style>
