// Mock persistence remote API

const noop = () => !1

const store = {
    load: noop,
    loadOrCreate: noop,
    save: noop,
    get() {
        return '__mocked_persistence_store__empty_value__'
    },
    has() {
        return false
    },
    set: noop,
    getAll() {
        return {}
    }
}

export default {
    get() {
        return store
    },
    has() {
        return false
    },
    create: noop
}
