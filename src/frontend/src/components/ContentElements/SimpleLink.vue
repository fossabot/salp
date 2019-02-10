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
            return this.href.indexOf('http') !== -1
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
