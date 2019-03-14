// PersistenceManager holds and manages different stores
const Store = require('./Store')

class PersistenceManager {
    constructor() {
        this.stores = {}
    }

    get(storeName) {
        return this.stores[storeName]
    }

    has(storeName) {
        return this.stores.hasOwnProperty(storeName)
    }

    create(storeName) {
        if (this.has(storeName)) {
            throw new Error(`The store "${storeName}" already exists.`)
        }

        return this.stores[storeName] = this._create(storeName)
    }

    _create(storeName) {
        const store = new Store(storeName)
        store.loadOrCreate()

        return store
    }
}

module.exports = PersistenceManager
