<template functional>
    <img class="contentelement-image" :src="props.src"/>
</template>

<script>
export default {
    name: 'SimpleImage',
    functional: true,
    props: {
        src: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss">
.contentelement-image {
    margin-top: 1em;
    max-width: 100%;
    object-fit: contain;
}
</style>
