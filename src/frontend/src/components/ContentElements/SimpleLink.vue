<template>
    <a @click="handleClick" class="contentelement-link"><slot/></a>
</template>

<script>
import { shell } from 'electron'

export default {
    name: 'SimpleLink',
    props: {
        href: {
            type: String,
            required: true
        }
    },
    computed: {
        isExternalLink() {
            try {
                /* eslint-disable no-new */
                new URL(this.href)

                return true
            } catch (error) {
                return false
            }
        }
    },
    methods: {
        handleClick() {
            if (this.isExternalLink) {
                shell.openExternal(this.href)
            } else {
                this.$router.push(this.href)
            }
        }
    }
}
</script>

<style lang="scss">
.contentelement-link {
    margin-top: auto;

    &:hover {
        cursor: pointer;
    }
}
</style>
