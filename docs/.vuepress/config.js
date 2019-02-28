module.exports = {
    title: 'SALP documentation',
    description: 'Documentation of the SALP project. Including a developer guide and user manual.',
    themeConfig: {
        logo: '/assets/img/logo.png',
        nav: [
            { text: 'Home', link: '/' },
            {
                text: 'Developer',
                link: '/development/',
                items: [
                    {
                        text: 'Introduction',
                        link: '01-Introduction.md'
                    },
                    {
                        text: 'Courses',
                        link: '02-Courses.md'
                    },
                    {
                        text: 'Sandbox',
                        link: '03-Sandbox.md'
                    }
                ]
            },
            { text: 'User Manual', link: '/user-manual/' }
        ]
    }
}
