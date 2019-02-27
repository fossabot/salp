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
import { namespace, types } from '@/store/modules/persisted/UserPreferences.js'
import { Container, Header, Main } from 'element-ui'
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
        setupDone() {
            return this.$store.getters[namespace + '/' + types.GET]('setupDone')
        }
    },
    watch: {
        pageTitle(title) {
            remote.getCurrentWindow().setTitle(title)
        }
    },
    beforeMount() {
        if (!this.setupDone) {
            this.$router.push({ name: 'setup' })
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
