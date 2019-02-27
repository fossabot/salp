class NetworkService {
    constructor(docker, courseName) {
        this.docker = docker
        this.courseName = courseName
    }

    async create() {
        await this._loadNetwork()
        if (this.network === undefined) {
            let network = await this.docker.createNetwork({ 'Name': this.networkName, 'Driver': 'bridge' })
            this.network = network
        }
    }

    async remove() {
        await this._loadNetwork()
        if (this.network !== undefined) {
            await this.network.remove()
            this.network = undefined
            this.networkName = undefined
        }
    }

    async getNetworkName() {
        await this._loadNetwork()

        return this.networkName
    }

    async _loadNetwork() {
        if (this.network !== undefined) {
            return
        }

        this.networkName = this._getNetworkName()
        const networks = await this.docker.listNetworks()
        for (const network of networks) {
            if (network.Name === this.networkName) {
                this.network = await this.docker.getNetwork(network.Id)

                return
            }
        }
    }

    _getNetworkName() {
        let name = this.courseName.trim()
        name = name.replace(/\s/g, '')
        let networkName = `salp_${name}_network`

        return networkName.toLocaleLowerCase()
    }
}

module.exports = NetworkService
