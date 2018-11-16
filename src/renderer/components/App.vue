<template>
  <Container id="app" direction="vertical">
    <Header id="header" height="38px">
      <h1 id="content-title">
        SQL Injections
      </h1>
      <div id="meta-menu">
        <span class="menu-item text-small">John</span>
        <Button type="text" icon="menu-item el-icon-info"></Button>
        <Button type="text" icon="menu-item el-icon-setting"></Button>
      </div>
    </Header>
    
    <Container>
      <Aside id="side" width="200px">
        <h1 id="app-title">
          Security Awareness Learning Platform
        </h1>
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>Home</template>
            <el-menu-item-group>
              <template slot="title">Group 1</template>
              <el-menu-item index="1-1">Option 1</el-menu-item>
              <el-menu-item index="1-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>Navigator Two</template>
            <el-menu-item-group>
              <template slot="title">Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>Navigator Three</template>
            <el-menu-item-group>
              <template slot="title">Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </Aside>

      <Container direction="vertical">
        <Main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140">
            </el-table-column>
            <el-table-column prop="name" label="Name" width="120">
            </el-table-column>
            <el-table-column prop="address" label="Address">
            </el-table-column>
          </el-table>
        </Main>
      </Container>
    </Container>
  </Container>
</template>

<script>
import { Container, Header, Footer, Main, Aside, Button, Menu, Submenu, MenuItem, MenuItemGroup, Table, TableColumn } from 'element-ui'

export default {
  name: 'App',
  components: {
    Container,
    Header,
    Footer,
    Main,
    Aside,

    Button,

    [Menu.name]: Menu,
    [Submenu.name]: Submenu,
    [MenuItem.name]: MenuItem,
    [MenuItemGroup.name]: MenuItemGroup,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      };

    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>


<style lang="scss">
@import "@/theme/element-variables.scss";

#app {
  height: 100vh;
}

#header.el-header {
  background-color: $--color-primary;
  color: $--color-white;
  padding: 2px 10px 2px (200px + $--main-padding);
  line-height: 2rem;
  font-size: 18px;

  -webkit-app-region: drag;
}

#content-title {
  color: $--color-white;
  display: inline-block;
}

#meta-menu {
  float: right;

  .el-button--text {
    color: $--color-white;
  }

  .menu-item {
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }
  }
}

#side {
  border-right: solid 1px $--border-color-lighter;

  .el-menu {
    border-right: none;
  }
}

#app-title {
  padding: .75rem;
  margin: 0;
}
</style>