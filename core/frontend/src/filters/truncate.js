import { truncate } from 'lodash'

export default function(text, length) {
    return truncate(text, {
        length,
        'separator': ' '
    })
}
