<template>
    <Card class="test-content__container">
        <h1>EXAM</h1>
        <SingleChoice :question="question" :answers="answers" />
        <MultipleChoice :question="question" :answers="answers" />
        <UserInput :question="question" questionPosition="top" v-model="answer"/>
        <div class="test-content__container__button-container">
            <Button type="primary">Check</Button>
        </div>
    </Card>
</template>

<script>
import { Card, Button } from 'element-ui'
import MultipleChoice from '../../TestElements/MultipleChoice.vue'
import SingleChoice from '../../TestElements/SingleChoice.vue'
import UserInput from '../../TestElements/UserInput.vue'

export default {
    name: 'Test',
    components: {
        Card,
        Button,
        MultipleChoice,
        SingleChoice,
        UserInput
    },
    data() {
        return {
            questionTyps: [
                'Lecture1',
                'Lecture2'
            ],
            currentQuestion: 0,
            question: 'What does the fox say?',
            answers: [
                { answer: 'Hacki Hacki Hacki Ho', correct: false },
                { answer: 'GubelGubel', correct: false },
                { answer: 'LabelLabel', correct: true }
            ],
            answer: ''
        }
    },
    computed: {
    },
    methods: {
    }
}
</script>

<style lang="scss">
.test-content__container__button-container {
    display: flex;
    justify-content: center;
    margin-top: 1em;
}
</style>
