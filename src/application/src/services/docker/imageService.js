module.exports = class ImageService {
    constructor(docker, course) {
        this.docker = docker
        this.course = course
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
        this._loadImages()
        for (const image of this.images) {
            try {
                let img = await this.docker.getImage(image)
                await img.remove()
            } catch (err) {
                // Image does not exist
            }
        }
        this.images = []
    }

    _validateImage(image) {
        if (image.indexOf(':') === -1) {
            return image + ':latest'
        }

        return image
    }

    _loadImages() {
        if(this.images.length !== 0) {
            return
        }
        for (const name in this.course.containers) {
            let image = this.course.containers[name].Image
            image = this._validateImage(image)
            this.images.push(image)
        }
    }
}
