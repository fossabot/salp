module.exports = {
    questions: [
        {
            component: 'MultipleChoice',
            question: 'What type of attacks exist?',
            answers: [
                { answer: 'active', correct: true },
                { answer: 'passive', correct: true },
                { answer: 'automatic', correct: false }
            ]
        },
        {
            component: 'SingleChoice',
            question: 'A SQL injection is what type of an attack?',
            answers: [
                { answer: 'active', correct: true },
                { answer: 'passive', correct: false },
                { answer: 'automatic', correct: false }
            ]
        }
    ]
}
