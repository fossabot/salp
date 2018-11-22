<template>
    <Menu id="meta-menu" :router="true" mode="horizontal">
        <MenuItem index="0" class="meta-menu__user">
            <i class="el-icon-fa-user"></i>
            <span slot="title">John</span>
        </MenuItem>
        <MenuItem index="1">
            <Tooltip placement="bottom" :content="$t('App.menu.health')">
                <i class="el-icon-fa-heartbeat"></i>
            </Tooltip>
        </MenuItem>
        <MenuItem index="2">
            <Tooltip placement="bottom" :content="$t('App.menu.updates')">
                <i class="el-icon-fa-download"></i>
            </Tooltip>
        </MenuItem>
        <MenuItem index="3" :route="{name: 'settings'}">
            <Tooltip placement="bottom" :content="$t('App.menu.settings')">
                <i class="el-icon-fa-cog"></i>
            </Tooltip>
        </MenuItem>
        <MenuItem index="4">
            <Tooltip placement="bottom" :content="$t('App.menu.about')">
                <i class="el-icon-fa-info-circle"></i>
            </Tooltip>
        </MenuItem>
    </Menu>
</template>

<script>
import { Menu, MenuItem, Tooltip } from 'element-ui'

export default {
    name: 'MetaMenu',
    components: {
        Menu,
        MenuItem,
        Tooltip
    }
}
</script>

<style lang="scss">
@import "@/theme/element-variables.scss";

#meta-menu {
    border: none;
    background: initial;

    .el-menu-item {
        border: none;
        color: $--color-white;
        padding: 0 2px;

        &:hover {
            background: initial;
        }

        i {
            color: $--color-white;
        }
    }

    .meta-menu__user {
        margin-right: 1em;
    }
}
</style>


