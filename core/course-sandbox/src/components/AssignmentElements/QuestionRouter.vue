<template>
    <div class="assignment__question-router-container">
        <div class="question-router-container__assignment-steps-container">
            <AssignmentSteps v-if="assignmentState !== 'NOT_STARTED'"
                             :current-question-index="currentQuestionIndex" :questions="questions"/>
        </div>
        <div class="assignment__hints-container">
            <Hints v-if="(assignmentState !== 'NOT_STARTED' && assignmentState !== 'SHOW_RESULTS') && currentQuestion.hints" @hintEvent="handleHintEvent"
                   :hints="currentQuestion.hints" :assignment-name="assignmentName" :retries="currentQuestionRetries"/>
        </div>
        <div class="question-router-container__question-container">
            <component v-if="assignmentState !== 'NOT_STARTED' && assignmentState !== 'SHOW_RESULTS'"
                       :is="currentQuestionComponent" v-bind="currentQuestionData" :ref="`${assignmentName}_currentQuestion`"
                       @validated="handleQuestionValidated"/>
        </div>
        <div class="question-router-container__controls-container">
            <Controls v-if="assignmentState !== 'SHOW_RESULTS'" @buttonClick="handleControlsClick"
                      :assignmentState="assignmentState" :assignment-name="assignmentName" :disabled="buttonDisabled"/>
        </div>
    </div>
</template>

<script>
import MultipleChoice from './MultipleChoice.vue'
import SingleChoice from './SingleChoice.vue'
import UserInput from './UserInput.vue'
import Controls from './Controls.vue'
import AssignmentSteps from './AssignmentSteps.vue'
import Hints from './Hints.vue'

export default {
    name: 'QuestionRouter',
    props: {
        questions: {
            type: Array,
            required: true
        },
        assignmentName: {
            type: String,
            required: true
        },
        assignmentState: {
            type: String,
            required: true
        },
        allowRetry: {
            type: Boolean,
            default: true
        }
    },
    components: {
        MultipleChoice,
        SingleChoice,
        UserInput,
        Controls,
        AssignmentSteps,
        Hints
    },
    data() {
        return {
            currentQuestionIndex: 0,
            currentQuestionRetries: 0,
            buttonDisabled: false
        }
    },
    computed: {
        currentQuestion() {
            return this.questions[this.currentQuestionIndex]
        },
        currentQuestionComponent() {
            return this.currentQuestion.component
        },
        currentQuestionData() {
            const { question, answers } = this.currentQuestion

            return {
                question,
                answers,
                assignmentName: this.assignmentName,
                retry: this.allowRetry
            }
        }
    },
    methods: {
        handleControlsClick() {
            this.$emit('controlsClick')
        },
        nextQuestion() {
            this.currentQuestionRetries = 0
            this.currentQuestionIndex++
            if (this.currentQuestionIndex + 1 >= this.questions.length) {
                this.$emit('lastQuestion')
            }
        },
        validate() {
            this.$refs[`${this.assignmentName}_currentQuestion`].validate()
        },
        handleQuestionValidated(correct) {
            this.questions[this.currentQuestionIndex].$correct = correct
            if (this.allowRetry && !correct) {
                this.currentQuestionRetries++
            }
            this.$matomo.trackEvent(this.assignmentName + '_assignment', 'question_' + this.currentQuestionIndex, 'retry_' + this.currentQuestionRetries, correct ? 1 : 0)
            this.$emit('validated', correct)
        },
        handleHintEvent(disabled) {
            this.buttonDisabled = disabled
        }
    }
}
</script>
<style lang="scss">
.assignment__question-router-container {

    .assignment__hints-container {
        display: flex;
        justify-content: center;
        margin-top: 1em;
    }

    .question-router-container__question-container,
    .question-router-container__controls-container{
        display: flex;
        justify-content: center;
        margin-top: 1em;
    }
}
</style>
