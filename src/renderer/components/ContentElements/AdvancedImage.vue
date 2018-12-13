<template functional>
    <Card class="contentelement-advanced-image" bodyStyle="min-content">
        <SimpleImage class="contentelement-advanced-image" :src="props.src" :height="props.height"/>
        <SimpleText class="contentelement-advanced-image-text">
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
    width: fit-content;
}
</style>
