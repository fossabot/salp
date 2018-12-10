// Abstract TableOfContents renderer mixin
export default {
    props: {
        depth: {
            default: 3,
            validate(value) {
                return Number.isInteger(value) && value > 0
            }
        },
        toc: {
            type: Object,
            required: true
        }
    },
    render() {
        const toc = this.createTOC(this.toc)

        return this.createRootElement(toc)
    },
    methods: {
        // render methods
        createLink(title) {
            return this.$createElement('a', {
                staticClass: 'toc__link',
                attrs: {
                    href: '#'
                }
            }, [title])
        },
        createMenuItem(content) {
            return this.$createElement('li', {
                staticClass: 'toc__menu__item'
            }, content)
        },
        createSubMenu(children) {
            return this.$createElement('ul', {
                staticClass: `toc__menu toc__menu--level-${this.$currentDepth}`
            }, children)
        },
        // creation methods
        createMenu(menu) {
            if (typeof menu === 'string') {
                return this.createMenuItem([this.createLink(menu)])
            }

            let menuContent = [this.createLink(menu.title)]

            let children = []
            if (menu.children && this.$currentDepth <= this.depth) {
                const previousLevel = this.$currentDepth++
                children = Object.values(menu.children).map(val => this.createMenu(val))
                this.$currentDepth = previousLevel

                menuContent = menuContent.concat(this.createSubMenu(children))
            }

            return this.createMenuItem(menuContent)
        },
        createTOC(toc) {
            this.$currentDepth = 1
            const subMenus = Object.values(toc).map(item => this.createMenu(item))

            this.$currentDepth = 0
            return this.createSubMenu(subMenus)
        },
        createRootElement(toc) {
            return this.$createElement('nav', {
                staticClass: 'toc'
            }, [toc])
        }
    }
}
