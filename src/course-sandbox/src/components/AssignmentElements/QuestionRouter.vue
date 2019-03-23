<template>
    <div class="assignment__question-router-container">
        <div class="question-router-container__assignment-steps-container">
            <AssignmentSteps v-if="assignmentState !== 'NOT_STARTED'"
                             :current-question-index="currentQuestionIndex" :questions="questions"/>
        </div>
        <div class="question-router-container__question-container">
            <component v-if="assignmentState !== 'NOT_STARTED' && assignmentState !== 'SHOW_RESULTS'"
                       :is="currentQuestionComponent" v-bind="currentQuestionData" :ref="`${assignmentName}_currentQuestion`"
                       @validated="handleQuestionValidated"/>
        </div>
        <div class="question-router-container__controls-container">
            <Controls v-if="assignmentState !== 'SHOW_RESULTS'" @buttonClick="handleControlsClick" :assignmentState="assignmentState"/>
        </div>
    </div>
</template>

<script>
import MultipleChoice from './MultipleChoice.vue'
import SingleChoice from './SingleChoice.vue'
import UserInput from './UserInput.vue'
import Controls from './Controls.vue'
import AssignmentSteps from './AssignmentSteps.vue'

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
        AssignmentSteps
    },
    data() {
        return {
            currentQuestionIndex: 0,
            currentQuestionRetries: 0
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
            let data = {}
            data.question = this.currentQuestion.question
            data.answers = this.currentQuestion.answers
            data.assignmentName = this.assignmentName
            data.retry = this.allowRetry

            return data
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
            this.$emit('validated', correct)
        }
    }
}
</script>
<style lang="scss">
.assignment__question-router-container {
    .question-router-container__assignment-steps-container {

    }

    .question-router-container__question-container,
    .question-router-container__controls-container{
        display: flex;
        justify-content: center;
        margin-top: 1em;
    }
}
</style>
