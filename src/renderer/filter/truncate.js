
import { truncate } from 'lodash'

export const truncateFilter = function(text, length) {
    return truncate(text, {
        length,
        'separator': ' '
    })
}
