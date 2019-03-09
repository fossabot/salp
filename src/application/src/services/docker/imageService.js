class ImageService {
    constructor(docker, course) {
        this.docker = docker
        this.course = course
        this.images = []
    }

    async pull(sender, image) {
        const stream = await this.docker.pull(this._validateImage(image))

        let layersProgress = {}

        function calculateProgress(progress) {
            layersProgress[progress.id] = progress

            let total = 0
            let current = 0
            for (const id in layersProgress) {
                let progress = layersProgress[id]
                total += progress.progressDetail.total
                current += progress.progressDetail.current
            }
            sender.send('docker:pullProgress', current, total)
        }

        return new Promise((resolve, reject) => {
            this.docker.modem.followProgress(stream, (err, finished) => {
                if (err) {
                    reject(err)
                }
                this.images.push(image)
                layersProgress = {}
                sender.send('docker:pullProgress', 0, 0)
                resolve(finished)
            }, (progress) => {
                if(progress.status === 'Downloading') {
                    calculateProgress(progress)
                }
            })
        })
    }

    async removeAll(sender) {
        this._loadImages()
        for (const image of this.images) {
            try {
                let img = await this.docker.getImage(image)
                await img.remove()
            } catch (error) {
                sender.send('docker:ready', false, error.message)
            }
        }
        this.images = []
    }

    _validateImage(image) {
        if (!image.includes(':')) {
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

module.exports = ImageService
