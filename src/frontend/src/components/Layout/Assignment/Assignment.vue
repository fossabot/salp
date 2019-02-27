<template>
    <Card class="assignment-content__container piwikTrackContent">
        <h1>{{ name }}</h1>
        <div v-if="started">
            <Steps :active="currentQuestionIndex">
                <Step v-for="(question, index) in questions" :key="`step${index}`"
                    :status="question.$correct ? 'success' : question.$correct === false ? 'error' : 'process'"/>
            </Steps>
            <div class="assignment-content__question-container">
                <component v-for="(question, index) in questions"
                    :key="`question_${index}`" :ref="`question_${index}`" :is="question.component"
                    :question="question.question" :answers="question.answers" :retry="retry"
                    :assignmentName="name" v-show="index === currentQuestionIndex"
                    @validated="handleQuestionValidated">
                </component>
            </div>
            <div v-if="showResult" class="assignment-content__result-container">
                <h3 v-if="passed">{{ $t('Layout.Assignment.result.passed') }}</h3>
                <h3 v-else>{{ $t('Layout.Assignment.result.failed') }}</h3>
            </div>
            <div v-if="!showResult" class="assignment-content__button-container">
                <Button class="assignment-content__button-container__button .piwikContentIgnoreInteraction"
                type="primary" @click="handleButtonClick">{{ buttonText }}</Button>
            </div>
        </div>
        <div v-if="!started" class="assignment-content__start-button-container">
            <Button class="assignment-content__start-button .piwikContentIgnoreInteraction"
            type="primary" @click="handleStartClick">Start Assignment</Button>
        </div>
    </Card>
</template>

<script>
import { Card, Button, Steps, Step } from 'element-ui'
import MultipleChoice from '../../AssignmentElements/MultipleChoice.vue'
import SingleChoice from '../../AssignmentElements/SingleChoice.vue'
import UserInput from '../../AssignmentElements/UserInput.vue'
import { questions } from '$root/__mocks__/assignment/questions.js'

export default {
    name: 'Assignment',
    props: {
        retry: {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            required: true
        },
        passedAt: {
            type: Number,
            required: true
        }
    },
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
            currentQuestionIndex: 0,
            validate: true,
            showResult: false,
            currentQuestionIndexRetrys: 0,
            started: false
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
            // Show Result Click
            if (this.buttonText === this.$t('Layout.Assignment.button.result')) {
                // Matomo finished assignment
                this.$matomo.trackEvent(this.name + '_assignment', 'finished', '' + this.passed)
            } else {
                // Matomo track button click
                this.$matomo.trackEvent(this.name + '_assignment', 'clicked', '' + this.buttonText)
            }

            // Validate current answer
            if (this.validate) {
                // Set buttonText to 'next question'
                this.buttonText = this.$t('Layout.Assignment.button.next')

                // Validate answer
                this.$refs[`question_${this.currentQuestionIndex}`][0].validate()

                if (this.currentQuestionIndex === this.questions.length - 1) {
                    if ((this.retry && this.questions[this.currentQuestionIndex].$correct)
                        || !this.retry) {
                        this.buttonText = this.$t('Layout.Assignment.button.result')
                    }
                }

            // Show Next question
            } else {
                this.currentQuestionIndex++
                this.currentQuestionIndexRetrys = 0

                // Show result if last question was reached
                if (this.currentQuestionIndex >= this.questions.length) {
                    this.showResult = true
                }

                // Set buttontext to 'check answer'
                this.buttonText = this.$t('Layout.Assignment.button.check')

                // Set validate to true, to validate answer with next button click
                this.validate = true
            }
        },
        handleQuestionValidated(result) {
            this.questions[this.currentQuestionIndex].$correct = result

            if (!this.retry || (this.retry && result)) {
                this.validate = false
            }

            if (this.retry && !this.questions[this.currentQuestionIndex].$correct) {
                this.currentQuestionIndexRetrys++
                this.buttonText = this.$t('Layout.Assignment.button.retry')
            }
            this.$matomo.trackEvent(this.name + '_assignment', 'question_' + this.currentQuestionIndex, 'retry_' + this.currentQuestionIndexRetrys, result ? 1 : 0)
        },
        handleStartClick() {
            this.$matomo.trackEvent(this.name + '_assignment', 'started')
            this.started = true
        }
    }
}
</script>

<style lang="scss">
.assignment-content__container {

    .assignment-content__button-container,
    .assignment-content__start-button-container,
    .assignment-content__question-container {
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
