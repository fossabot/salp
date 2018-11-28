import { faCheckSquare, faCheckCircle, faHistory, faStar } from '@fortawesome/free-solid-svg-icons'

let course = {
    name: 'SQL injections',
    description: 'This course will introduce you to SQL injections which are commonly found in web applications and can lead to desastrous data loss.',
    author: 'John Doe',
    version: '1.0',
    lessons: 6,
    tests: 3,
    tags: ['SQL', 'active attack', 'web applications']
}

const progresses = [100, 72, 50, 23, 0];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let getCourses = num => {
    return new Array(num)
        .fill(course)
        .map(c => {
            return {
                ...c,
                progress: progresses[getRandomInt(5)]
            };
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
            title: 'Recommended',
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
            items: getCourses(4),
        },
        enrolled: {
            title: this.$t('Pages.Profile.groups.enrolledCourses'),
            items: getCourses(3),
            showCount: true
        },
        passedTests: {
            title: this.$t('Pages.Profile.groups.passedTests'),
            icon: faCheckSquare,
            items: getCourses(5),
        },
        failedTests: {
            title: this.$t('Pages.Profile.groups.failedTests'),
            items: getCourses(2),
            showCount: true
        }
    }
}
