<template functional>
    <Card class="contentelement-app-preview">
        <div class="contentelement-app-preview__content-image__container">
            <SimpleImage class="contentelement-app-preview-image" :src="props.src" :height="props.height"/>

            <div class="contentelement-app-preview__content__container">
                <Heading class="contentelement-app-preview__content__heading" :level="2">
                    {{ props.heading }}
                </Heading>

                <SimpleText class="contentelement-app-preview__content__description">
                    {{ props.description }}
                </SimpleText>

                <SimpleLink class="contentelement-app-preview__content__link" :url="props.url"/>
            </div>
        </div>
    </Card>
</template>

<script>
import SimpleImage from './SimpleImage.vue'
import Heading from './Heading.vue'
import SimpleText from './SimpleText.vue'
import SimpleLink from './SimpleLink.vue'
import { Card } from 'element-ui'

export default {
    name: 'AppPreview',
    functional: true,
    components: {
        SimpleImage,
        Heading,
        SimpleText,
        SimpleLink,
        Card
    },
    props: {
        src: {
            type: String,
            required: true
        },
        height: {
            type: String
        },
        heading: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        url: {
            type: String,
            default() {
                return ''
            }
        }
    }
}
</script>

<style lang="scss">
.contentelement-app-preview {
    margin-top: 1em;
    margin-bottom: 0;

    .contentelement-app-preview__content-image__container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .contentelement-app-preview__content__container {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            margin-left: 1em;
        }
    }
}
</style>
