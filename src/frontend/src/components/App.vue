<template>
  <Container id="app" direction="vertical">
    <Header id="app-header">
      <h1 class="app-header__item page-title">
        {{ pageTitle }}
      </h1>
      <MetaMenu class="app-header__item meta-menu"/>
    </Header>

    <Container>
      <Aside id="app-sidebar">
        <MainMenu/>
      </Aside>

      <Main id="app-content">
        <router-view @pageTitle="handlePageTitleChange"></router-view>
      </Main>
    </Container>
  </Container>
</template>

<script>
import { remote } from 'electron'
import { namespace, types } from '@/store/modules/persisted/UserPreferences.js'
import { Container, Header, Main, Aside } from 'element-ui'
import MainMenu from './MainMenu.vue'
import MetaMenu from './MetaMenu.vue'

export default {
    name: 'App',
    components: {
        Container,
        Header,
        Main,
        Aside,

        MainMenu,
        MetaMenu
    },
    data() {
        return {
            pageTitle: 'App'
        }
    },
    computed: {
        allowTracking() {
            return this.$store.getters[namespace + '/' + types.GET]('allowTracking')
        }
    },
    beforeMount() {
        if (this.allowTracking) {
            this.$matomo.setConsentGiven()
        }
    },
    watch: {
        $route(to) {
            this.pageTitle = to.name
        },
        pageTitle(title) {
            remote.getCurrentWindow().setTitle(title)
        }
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
    padding: 2px 10px 2px (200px + $--main-padding);
    font-size: 18px;
    line-height: 58px;
    -webkit-app-region: drag;

    .app-header__item {
        display: inline-block;
        margin: 0;
        -webkit-app-region: no-drag;
    }
}

#app-sidebar {
    width: 200px !important;
    border-right: solid 1px $--border-color-lighter;

    .el-menu {
        border-right: none;
    }
}

.page-title {
    color: $--color-white;
}

.meta-menu {
    float: right;
}
</style>
