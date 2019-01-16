// salp content elements plugin
// adds custom rendering rules

const tablePlugin = require('./table')

module.exports = function ContentElementsPlugin(md) {
    tablePlugin.call(this, md)

    // helpers
    function addCEMapping(contentElementName, tokenType, openFn, closeFn, chain = 'core') {
        md[chain].ruler.push('CE_' + contentElementName, state => {
            state.tokens.filter(token => token.type === tokenType + '_open').map(openFn)
            state.tokens.filter(token => token.type === tokenType + '_close').map(closeFn)
        })
    }

    function addCEStaticMapping(contentElementName, tokenType, contentElementTag) {
        function setTag(token) {
            token.tag = contentElementTag

            return token
        }

        addCEMapping(contentElementName, tokenType, setTag, setTag)
    }

    // rendering rules
    addCEMapping(
        'Heading',
        'heading',
        token => {
            const level = token.tag.slice(1)

            token.tag = 'Heading'
            token.attrs.unshift([ ':level', level ])

            return token
        },
        token => {
            token.tag = 'Heading'

            return token
        }
    )

    addCEStaticMapping('SimpleText', 'paragraph', 'SimpleText')
    addCEStaticMapping('Quote', 'blockquote', 'Quote')

    addCEStaticMapping('SimpleListItem', 'list_item', 'SimpleListItem')
    addCEMapping(
        'SimpleList_ordered',
        'bullet_list',
        token => {
            token.tag = 'SimpleList'

            if (!token.attrs) {
                token.attrs = []
            }
            token.attrs.push([':ordered', false])
        },
        token => {
            token.tag = 'SimpleList'
        }
    )

    addCEMapping(
        'SimpleList_ordered',
        'ordered_list',
        token => {
            token.tag = 'SimpleList'

            if (!token.attrs) {
                token.attrs = []
            }
            token.attrs.push([':ordered', true])
        },
        token => {
            token.tag = 'SimpleList'
        }
    )

    md.renderer.rules.image = function renderCEImage(tokens, idx) {
        const token = tokens[idx]

        let title = token.attrs.find(attr => attr[0] === 'title')
        title = title ? title[1] : false

        const src = token.attrs.find(attr => attr[0] === 'src')[1]
        const alt = token.attrs.find(attr => attr[0] === 'alt')[1]

        if (title) {
            return `<AdvancedImage src="${src}" description="${title}"/>`
        } else {
            return `<SimpleImage src="${src}" alt="${alt}"/>`
        }
    }

    md.renderer.rules.video = function renderVideo(tokens, idx) {
        const token = tokens[idx]

        if (token.info.serviceName !== 'youtube') {
            return `<!-- ${token.info.serviceName} videos are not supported -->`
        }

        // TODO: escape attributes
        return `<SimpleVideo src="${token.info.videoReference}"/>`
    }
}
