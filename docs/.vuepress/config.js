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
                        link: '/development/01-Introduction.md'
                    },
                    {
                        text: 'Courses',
                        link: '/development/02-Courses.md'
                    },
                    {
                        text: 'Sandbox',
                        link: '/development/03-Sandbox.md'
                    },
                    {
                        text: 'Matomo',
                        link: '/development/04-Matomo.md'
                    }
                ]
            },
            {
                text: 'User Manual',
                link: '/user-manual/',
                items: [
                    {
                        text: 'Getting Started',
                        link: '/user-manual/01-GettingStarted.md'
                    },
                    {
                        text: 'Docker manual',
                        link: '/user-manual/02-DockerManual.md'
                    },
                    {
                        text: 'Matomo',
                        link: '/user-manual/03-Matomo.md'
                    }
                ]
            }
        ]
    }
}
