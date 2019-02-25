<template>
    <Menu :router="true" :default-openeds="['1']">
        <Submenu index="1">
            <template slot="title">First</template>
            <MenuItemGroup>
                <template slot="title">Group 1</template>
                <ElMenuItem index="1-1">Option 1</ElMenuItem>
                <ElMenuItem index="1-2">Option 2</ElMenuItem>
            </MenuItemGroup>
            <MenuItemGroup title="Group 2">
                <ElMenuItem index="1-3">Option 3</ElMenuItem>
            </MenuItemGroup>
            <Submenu index="1-4">
                <template slot="title">Option4</template>
                <ElMenuItem index="1-4-1">Option 4-1</ElMenuItem>
            </Submenu>
        </Submenu>
        <Submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>Navigator Two</template>
            <MenuItemGroup>
                <template slot="title">Group 1</template>
                <ElMenuItem index="2-1">Option 1</ElMenuItem>
                <ElMenuItem index="2-2">Option 2</ElMenuItem>
            </MenuItemGroup>
            <MenuItemGroup title="Group 2">
                <ElMenuItem index="2-3">Option 3</ElMenuItem>
            </MenuItemGroup>
            <Submenu index="2-4">
                <template slot="title">Option 4</template>
                <ElMenuItem index="2-4-1">Option 4-1</ElMenuItem>
            </Submenu>
        </Submenu>
        <Submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>Navigator Three</template>
            <MenuItemGroup>
                <template slot="title">Group 1</template>
                <ElMenuItem index="3-1">Option 1</ElMenuItem>
                <ElMenuItem index="3-2">Option 2</ElMenuItem>
            </MenuItemGroup>
            <MenuItemGroup title="Group 2">
                <ElMenuItem index="3-3">Option 3</ElMenuItem>
            </MenuItemGroup>
            <Submenu index="3-4">
                <template slot="title">Option 4</template>
                <ElMenuItem index="3-4-1">Option 4-1</ElMenuItem>
            </Submenu>
        </Submenu>
    </Menu>
</template>

<script>
import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default {
    name: 'MainMenu',
    components: {
        Menu,
        Submenu,
        /* eslint-disable-next-line vue/no-unused-components */
        [MenuItem.name]: MenuItem,
        MenuItemGroup
    },
    icons: {
        faHome
    }
}
</script>
