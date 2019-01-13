export const questions = [
    {
        component: 'MultipleChoice',
        question: 'Lorem?',
        answers: [
            { answer: 'dollor', correct: false },
            { answer: 'sit', correct: false },
            { answer: 'atmet', correct: true }
        ]
    },
    {
        component: 'SingleChoice',
        question: 'Ipsum?',
        answers: [
            { answer: 'Lorem', correct: false },
            { answer: 'Sit', correct: true },
            { answer: 'Lorem Ipsum', correct: false }
        ]
    },
    {
        component: 'UserInput',
        question: 'Lorem Ipsum?',
        answers: [
            { answer: 'lorem' }
        ]
    },
    {
        component: 'UserInput',
        question: 'Dollor sit atmet?',
        answers: [
            { answer: 'ipsum' }
        ]
    }
]
