<template functional>
    <video class="contentelement-video" controls="true" controls-list="nodownload">
        <source :src="props.src"/>
    </video>
</template>

<script>
export default {
    name: 'SimpleVideo',
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
.contentelement-video {
    margin-top: 1em;
    margin-bottom: 0;
    max-width: 100%;
}
</style>
