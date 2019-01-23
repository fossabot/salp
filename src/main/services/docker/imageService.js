module.exports = class ImageService {
    constructor(docker) {
        this.docker = docker
        this.images = []
    }

    async pull(image) {
        const stream = await this.docker.pull(this._validateImage(image))

        return new Promise((resolve, reject) => {
            this.docker.modem.followProgress(stream, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
                this.images.push(image)
            })
        })
    }

    async removeAll() {
        for (const image of this.images) {
            const img = await this.docker.getImage(image)
            await img.remove()
        }
        this.images = []
    }

    _validateImage(image) {
        if (image.indexOf(':') === -1) {
            return image + ':latest'
        }

        return image
    }
}
