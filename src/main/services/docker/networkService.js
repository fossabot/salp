module.exports = class NetworkService {
    constructor(docker, courseName) {
        this.docker = docker
        this.courseName = courseName
    }

    async create() {
        let name = this.courseName.trim()
        name = name.replace(/\s/g, '')
        let networkName = `salp_${name}_network`
        this.networkName = networkName.toLocaleLowerCase()
        if (!await this._networkExists()) {
            let network = await this.docker.createNetwork({ 'Name': this.networkName, 'Driver': 'bridge' })
            this.network = network
        }
    }

    async remove() {
        await this.network.remove()
        this.network = undefined
        this.networkName = ''
    }

    getNetworkName() {
        return this.networkName
    }

    async _networkExists() {
        const networks = await this.docker.listNetworks()
        let found = false
        for (const network of networks) {
            if (network.Name === this.networkName) {
                found = true
            }
        }

        return found
    }
}
