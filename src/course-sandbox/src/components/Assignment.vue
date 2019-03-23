<template>
    <Card class="assignment-content__container piwikTrackContent">
        <h1>{{ name }}</h1>
        <div class="assignment-content__question-container">
            <QuestionRouter :questions="questions" :allow-retry="retry"
                            :assignment-name="name" :assignment-state="state" :ref="`${name}_router`"
                            @validated="handleQuestionValidated" @controlsClick="handleControlsClick"
                            @lastQuestion="handleLastQuestion"/>
        </div>
        <div v-if="state === 'SHOW_RESULTS'" class="assignment-content__result-container">
            <h3 v-if="passed">{{ $t('Assignment.result.passed') }}</h3>
            <h3 v-else>{{ $t('Assignment.result.failed') }}</h3>
        </div>
    </Card>
</template>

<script>
import { Card } from 'element-ui'
import QuestionRouter from './AssignmentElements/QuestionRouter.vue'

export default {
    name: 'Assignment',
    props: {
        questions: {
            type: Array,
            required: true
        },
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
            default: 0.5
        }
    },
    components: {
        Card,

        QuestionRouter
    },
    data() {
        return {
            state: 'NOT_STARTED',
            lastQuestion: false
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
        handleQuestionValidated(correct) {
            if (!correct && this.retry) {
                this.state = 'ANSWERING_RETRY'
            } else {
                if (this.lastQuestion) {
                    this.state = 'FINISHED'
                } else {
                    this.state = 'NEXT_QUESTION'
                }
            }
        },
        handleControlsClick() {
            // Trigger method depending on current state
            switch (this.state) {
                case 'NOT_STARTED':
                    this.state = 'ANSWERING'
                    break
                case 'FINISHED':
                    this.$refs[`${this.name}_router`].nextQuestion()
                    this.state = 'SHOW_RESULTS'
                    break
                case 'NEXT_QUESTION':
                    this.state = 'ANSWERING'
                    this.$refs[`${this.name}_router`].nextQuestion()
                    break
                case 'ANSWERING':
                case 'ANSWERING_RETRY':
                    this.validate()
                    break
            }
        },
        validate() {
            this.$refs[`${this.name}_router`].validate()
        },
        handleLastQuestion() {
            this.lastQuestion = true
        }
    }

}
</script>
<style lang="scss">
.assignment-content__container {
    .assignment-content__result-container {
        display: flex;
        justify-content: center;
        margin-top: 1em;
    }
}
</style>
