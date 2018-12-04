<script>
import TableOfContentsMixin from '@/mixins/TableOfContents.js'

export default {
    name: 'TableOfContents',
    mixins: [
        TableOfContentsMixin
    ],
    methods: {
        createRootElement(toc) {
            return this.$createElement('nav', {
                staticClass: 'toc toc--layout-content'
            }, [toc])
        }
    }
}
</script>

<style lang="scss">
.toc--layout-content {
    .toc__menu {
        list-style-type: decimal;
    }

    .toc__link {
        display: block;
        padding: 0.5em 0;
    }
}
</style>
