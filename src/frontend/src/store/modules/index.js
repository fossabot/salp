import persisted from './persisted'
import AppState from './AppState'
import Courses from './Courses'

export { PersistedUserPreferences, PersistedAppState } from './persisted'
export { CoursesStorePlugin } from './Courses'
export { DockerPlugin } from './AppState'

export default {
    persisted,
    AppState,
    Courses
}
