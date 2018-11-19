<template>
  <Container id="app" direction="vertical">
    <Header id="app-header">
      <h1 class="app-header__item page-title">
        {{ pageTitle }}
      </h1>
      <nav class="app-header__item meta-menu">
        <Button type="text" class="text-small">John</Button>
        <Button type="text" icon="el-icon-fa-heartbeat"></Button>
        <Button type="text" icon="el-icon-fa-download"></Button>
        <Button type="text" icon="el-icon-fa-cog"></Button>
        <Button type="text" icon="el-icon-fa-info-circle"></Button>
      </nav>
    </Header>
    
    <Container>
      <Aside id="app-sidebar">
        <MainMenu/>
      </Aside>

      <Main id="app-content">
        <router-view></router-view>
      </Main>
    </Container>
  </Container>
</template>

<script>
import { Container, Header, Footer, Main, Aside, Button } from 'element-ui'
import MainMenu from './MainMenu.vue'

export default {
  name: 'App',
  components: {
    Container,
    Header,
    Footer,
    Main,
    Aside,

    Button,

    MainMenu
  },
  computed: {
    pageTitle() {
      let title = this.$route.meta.title || this.$route.name

      if (typeof title === 'function') {
        title = title()
      }

      return title
    }
  }
}
</script>


<style lang="scss">
@import "@/theme/element-variables.scss";

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

  .el-button {
    font-size: inherit;
    color: $--color-white;
  }
}
</style>