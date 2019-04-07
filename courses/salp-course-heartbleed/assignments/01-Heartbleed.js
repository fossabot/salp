module.exports = {
    retry: true,
    passedAt: 0.7,
    questions: [
        {
            component: 'SingleChoice',
            question: 'When was Heartbleed discovered?',
            answers: [
                { answer: '2012', correct: false },
                { answer: '2017', correct: false },
                { answer: '2014', correct: true }
            ],
            hints: [
                'Fixed in version 1.0.1g',
                'After 2012',
                'Before 2017'
            ]
        },
        {
            component: 'MultipleChoice',
            question: 'Which of the following assertions are true?',
            answers: [
                { answer: 'Heartbleed is a buffer over-read', correct: true },
                { answer: 'Heartbleed is a buffer over-flow', correct: false },
                { answer: 'Heartbleed is a bug inside OpsenSSL Heartbeat-Extension', correct: true },
                { answer: 'No servers are vulnerable to Heartbleed today', correct: false }
            ]
        },
        {
            component: 'UserInput',
            question: 'HeartBleed was fixed in OpenSSL:',
            answers: [
                { answer: '1.0.1g'},
                { answer: 'OpenSSL 1.0.1g'},
                { answer: 'OpenSSL1.0.1g'}
            ]
        },
        {
            component: 'SingleChoice',
            question: 'HeartBleed can be found at?',
            answers: [
                { answer: 'CVE-2014-0160', correct: true },
                { answer: 'RFC6520', correct: false },
                { answer: 'CVE-2017-5754', correct: false }
            ],
            hints: [
                'CVE-Year',
                'Meltdown was discovered 2017',
                'RFC = Request for commons'
            ]
        }
    ]
}
