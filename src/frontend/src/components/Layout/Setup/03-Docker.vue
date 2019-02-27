<template>
    <div id="setup-docker">
        {{ $t('Pages.Setup.contents.Docker.description1') }}
        <ExternalLink href="https://www.docker.com/">Docker</ExternalLink>
        {{ $t('Pages.Setup.contents.Docker.description2') }}

        {{ $t('Pages.Setup.contents.Docker.installation1') }}
        <ExternalLink href="https://docs.docker.com/install/">{{ $t('Pages.Setup.contents.Docker.install') }}</ExternalLink>
        {{ $t('Pages.Setup.contents.Docker.installation2') }}
    </div>
</template>

<script>
import ExternalLink from '@/components/Elements/ExternalLink.vue'

export default {
    name: 'Setup-Docker',
    pageTitleTranslationKey: 'Pages.Setup.Steps.Docker',
    components: {
        ExternalLink
    }
}
</script>
