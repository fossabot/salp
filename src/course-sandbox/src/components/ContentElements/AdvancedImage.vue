<template functional>
    <Card class="contentelement-advanced-image">
        <SimpleImage class="contentelement-advanced-image__simple-image" :src="props.src"/>
        <SimpleText class="contentelement-advanced-image__simple-text">
            {{ props.description }}
        </SimpleText>
    </Card>
</template>

<script>
import { Card } from 'element-ui'
import SimpleImage from './SimpleImage.vue'
import SimpleText from './SimpleText.vue'

export default {
    name: 'AdvancedImage',
    functional: true,
    components: {
        Card,
        SimpleImage,
        SimpleText
    },
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
        },
        description: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss">
.contentelement-advanced-image {
    width: min-content;
    margin-top: 1em;
    margin-bottom: 0;
    max-width: 100%;

    img {
        max-width: unset;
    }
}
</style>
