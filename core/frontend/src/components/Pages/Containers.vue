<template>
    <div id="page-containers">
        <ContainerOverview/>
    </div>
</template>

<script>
import ContainerOverview from '../Docker/ContainerOverview.vue'

export default {
    name: 'Containers',
    pageTitleTranslationKey: 'App.pages.containers',
    components: {
        ContainerOverview
    }
}
</script>
