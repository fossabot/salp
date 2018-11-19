<template>
    <Menu :router="true" :default-openeds="['1']">
        <MenuItem index="0" :route="{name: 'home'}"><i class="el-icon-fa-home"></i>Home</MenuItem>
        <Submenu index="1">
            <template slot="title">First</template>
            <MenuItemGroup>
                <template slot="title">Group 1</template>
                <MenuItem index="1-1">Option 1</MenuItem>
                <MenuItem index="1-2">Option 2</MenuItem>
            </MenuItemGroup>
            <MenuItemGroup title="Group 2">
                <MenuItem index="1-3">Option 3</MenuItem>
            </MenuItemGroup>
            <Submenu index="1-4">
                <template slot="title">Option4</template>
                <MenuItem index="1-4-1">Option 4-1</MenuItem>
            </Submenu>
        </Submenu>
        <Submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>Navigator Two</template>
            <MenuItemGroup>
                <template slot="title">Group 1</template>
                <MenuItem index="2-1">Option 1</MenuItem>
                <MenuItem index="2-2">Option 2</MenuItem>
            </MenuItemGroup>
            <MenuItemGroup title="Group 2">
                <MenuItem index="2-3">Option 3</MenuItem>
            </MenuItemGroup>
            <Submenu index="2-4">
                <template slot="title">Option 4</template>
                <MenuItem index="2-4-1">Option 4-1</MenuItem>
            </Submenu>
        </Submenu>
        <Submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>Navigator Three</template>
            <MenuItemGroup>
                <template slot="title">Group 1</template>
                <MenuItem index="3-1">Option 1</MenuItem>
                <MenuItem index="3-2">Option 2</MenuItem>
            </MenuItemGroup>
            <MenuItemGroup title="Group 2">
                <MenuItem index="3-3">Option 3</MenuItem>
            </MenuItemGroup>
            <Submenu index="3-4">
                <template slot="title">Option 4</template>
                <MenuItem index="3-4-1">Option 4-1</MenuItem>
            </Submenu>
        </Submenu>
    </Menu>
</template>

<script>
import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui'

export default {
    name: 'MainMenu',
    components: {
        Menu,
        Submenu,
        MenuItem,
        MenuItemGroup
    }
}
</script>
