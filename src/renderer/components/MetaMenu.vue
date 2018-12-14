<template>
    <Menu id="meta-menu" :router="true" mode="horizontal">
        <MenuItem index="0" class="meta-menu__user" :route="{name: 'profile'}">
            <Icon icon="faUser"/>
            <span slot="title">{{ username }}</span>
        </MenuItem>
        <MenuItem index="1">
            <Tooltip placement="bottom" :content="$t('App.menu.health')">
                <Icon icon="faHeartbeat"/>
            </Tooltip>
        </MenuItem>
        <MenuItem index="2">
            <Tooltip placement="bottom" :content="$t('App.menu.updates')">
                <Icon icon="faDownload"/>
            </Tooltip>
        </MenuItem>
        <MenuItem index="3" :route="{name: 'settings'}">
            <Tooltip placement="bottom" :content="$t('App.menu.settings')">
                <Icon icon="faCog"/>
            </Tooltip>
        </MenuItem>
        <MenuItem index="4">
            <Tooltip placement="bottom" :content="$t('App.menu.about')">
                <Icon icon="faInfoCircle"/>
            </Tooltip>
        </MenuItem>
    </Menu>
</template>

<script>
import { Menu, MenuItem, Tooltip } from 'element-ui'
import { faUser, faHeartbeat, faDownload, faCog, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { createNamespacedHelpers } from 'vuex'
import { namespace } from '@/store/modules/persisted/UserPreferences.js'

const { mapState } = createNamespacedHelpers(namespace)

export default {
    name: 'MetaMenu',
    components: {
        Menu,
        MenuItem,
        Tooltip
    },
    icons: {
        faUser,
        faHeartbeat,
        faDownload,
        faCog,
        faInfoCircle
    },
    computed: mapState(['username'])
}
</script>

<style lang="scss">
#meta-menu {
    border: none;
    background: initial;

    .el-menu-item {
        border: none;
        color: $--color-white;
        padding: 0 2px;

        &:hover, &:focus {
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
