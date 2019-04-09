// Based on: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
const formatBytes = (bytes, decimals, label) => {
    if (bytes === 0) {
        return '0 Bytes'
    }
    const k = 1024
    let dm = decimals <= 0 ? 0 : decimals || 2
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    let result = '' + parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
    if (label) {
        result += ' ' + sizes[i]
    }

    return result
}
export default formatBytes
