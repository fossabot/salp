<template>
    <Steps :active="currentQuestionIndex">
        <Step v-for="(question, index) in questions" :key="`step${index}`"
              :status="question.$correct ? 'success' : question.$correct === false ? 'error' : 'process'"/>
    </Steps>
</template>

<script>
import { Steps, Step } from 'element-ui'

export default {
    name: 'AssignmentSteps',
    props: {
        questions: {
            type: Array,
            required: true
        },
        currentQuestionIndex: {
            type: Number,
            required: true
        }
    },
    components: {
        Steps,
        Step
    }
}
</script>
