<template>
  <Container id="app" direction="vertical">
    <Header id="app-header">
      <h1 class="app-header__item page-title">
        {{ pageTitle }}
      </h1>
      <MainMenu class="app-header__item meta-menu"/>
    </Header>

    <Main id="app-content">
      <router-view @pageTitle="handlePageTitleChange"></router-view>
    </Main>
  </Container>
</template>

<script>
import { remote } from 'electron'
import { Container, Header, Main } from 'element-ui'
import { getSettings } from '@/store/modules/settings/utils'
import { GENERAL_NAMESPACE, ALLOW_TRACKING, SETUP_DONE } from '@/store/modules/settings/general'
import MainMenu from './MainMenu.vue'

// TODO: implement page title handling fallback when new route didn't emit 'pageTitle' event
export default {
    name: 'App',
    components: {
        Container,
        Header,
        Main,

        MainMenu
    },
    data() {
        return {
            pageTitle: 'App'
        }
    },
    computed: {
        ...getSettings(GENERAL_NAMESPACE, {
            allowTracking: ALLOW_TRACKING,
            setupDone: SETUP_DONE
        })
    },
    watch: {
        pageTitle(title) {
            remote.getCurrentWindow().setTitle(title)
        }
    },
    beforeMount() {
        // TODO: fix initial settings loading
        setTimeout(() => {
            if (!this.setupDone) {
                this.$router.push({ name: 'setup' })
            }

            if (this.allowTracking) {
                this.$matomo.setConsentGiven()
            }
        }, 1000)
    },
    methods: {
        handlePageTitleChange(title) {
            this.pageTitle = title
        }
    }
}
</script>

<style lang="scss">
#app {
    height: 100vh;
}

#app-header {
    height: 60px !important;
    background-color: $--color-primary;
    color: $--color-white;
    padding: 2px 10px 2px 85px;
    font-size: 18px;
    line-height: 58px;
    -webkit-app-region: drag;

    .app-header__item {
        display: inline-block;
        margin: 0;
        -webkit-app-region: no-drag;
    }
}

.page-title {
    color: $--color-white;
}

.meta-menu {
    float: right;
}

#app-content {
    display: flex;

    & > [id^="page-"] {
        flex: 1;
    }
}
</style>
