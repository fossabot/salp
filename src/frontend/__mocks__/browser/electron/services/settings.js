// Mock persistence remote API

const noop = () => !1

export default {
    has: noop,
    set: noop,
    setAll: noop,
    get() {
        return '__mocked_persistence_store__empty_value__'
    },
    getAll() {
        return {}
    },
    delete: noop,
    deleteAll: noop,
    watch: noop
}
