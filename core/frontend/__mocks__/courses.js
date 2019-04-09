import { faCheckSquare, faCheckCircle, faHistory, faStar } from '@fortawesome/free-solid-svg-icons'

let course = {
    name: 'SQL injections',
    description: `This course will introduce you to SQL injections which are commonly found in web applications and can lead to desastrous data loss. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    author: 'John Doe',
    version: '1.0',
    chapters: 6,
    assignments: 3,
    tags: ['SQL', 'active attack', 'web applications'],
    progress: 72
}

const courseContents = {
    intro: 'Introduction',
    dbms: {
        title: 'Database Management Systems',
        children: {
            intro: 'Introduction',
            comparison: 'Comparison between DBMS'
        }
    },
    sql: {
        title: 'Structure Query Language',
        children: {
            usage: 'Usage and requirements',
            integration: 'Integration with DBMS',
            software: {
                title: 'Usage in software products',
                children: {
                    wearknesses: 'Weaknesses'
                }
            }
        }
    },
    attacks: {
        title: 'Attacks on SQL statements in software',
        children: {
            nonescaped: 'Non-escaped statements',
            blind: 'Blind attacks',
            advanced: 'Advanced attacks'
        }
    },
    threat: {
        title: 'Threat assesment',
        children: {
            measurement: 'Measurement',
            prevention: 'Prevention'
        }
    }
}

export { course, courseContents }

const progresses = [100, 72, 50, 23, 0]

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

let getCourses = num => {
    return new Array(num)
        .fill(course)
        .map(c => {
            return {
                ...c,
                progress: progresses[getRandomInt(5)]
            }
        })
}

export function groups(t) {
    return {
        recent: {
            title: this.$t('Layout.Course.overview.categories.recent'),
            icon: faHistory,
            items: getCourses(4)
        },
        favourites: {
            title: this.$t('Layout.Course.overview.categories.favourites'),
            icon: faStar,
            items: getCourses(3),
            showCount: true
        },
        recommended: {
            title: 'Recommended'
        },
        installed: {
            title: this.$t('Layout.Course.overview.categories.installed'),
            items: getCourses(11),
            showCount: true
        }
    }
}

export function groupsProfile() {
    return {
        finished: {
            title: this.$t('Pages.Profile.groups.finishedCourses'),
            icon: faCheckCircle,
            items: getCourses(4)
        },
        enrolled: {
            title: this.$t('Pages.Profile.groups.enrolledCourses'),
            items: getCourses(3),
            showCount: true
        },
        passedTests: {
            title: this.$t('Pages.Profile.groups.passedTests'),
            icon: faCheckSquare,
            items: getCourses(5)
        },
        failedTests: {
            title: this.$t('Pages.Profile.groups.failedTests'),
            items: getCourses(2),
            showCount: true
        }
    }
}
