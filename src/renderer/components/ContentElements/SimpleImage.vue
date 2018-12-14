<template functional>
    <img class="contentelement-image" :src="props.src" :style="{height: props.height}"/>
</template>

<script>
export default {
    name: 'SimpleImage',
    functional: true,
    props: {
        src: {
            type: String,
            required: true
        },
        height: {
            type: String,
            default() {
                return 'auto'
            }
        }
    }
}
</script>

<style lang="scss">
.contentelement-image {
    object-fit: contain;
}
</style>
