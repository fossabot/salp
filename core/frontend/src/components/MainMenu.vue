<template>
    <Menu id="meta-menu" :router="true" mode="horizontal">
        <ElMenuItem index="0" :route="{name: 'home'}">
            <Tooltip placement="bottom" :content="$t('App.menu.home')">
                <Icon icon="faHome"/>
            </Tooltip>
        </ElMenuItem>
        <ElMenuItem index="0" class="meta-menu__user" :route="{name: 'profile'}">
            <Icon icon="faUser"/>
            <span slot="title">{{ username }}</span>
        </ElMenuItem>
        <ElMenuItem index="1" :route="{name: 'containers'}">
            <Tooltip placement="bottom" :content="$t('App.menu.health')">
                <Icon icon="faHeartbeat"/>
            </Tooltip>
        </ElMenuItem>
        <ElMenuItem index="2">
            <Tooltip placement="bottom" :content="$t('App.menu.updates')">
                <Icon icon="faDownload"/>
            </Tooltip>
        </ElMenuItem>
        <ElMenuItem index="3" :route="{name: 'settings'}">
            <Tooltip placement="bottom" :content="$t('App.menu.settings')">
                <Icon icon="faCog"/>
            </Tooltip>
        </ElMenuItem>
    </Menu>
</template>

<script>
import { Menu, MenuItem, Tooltip } from 'element-ui'
import { faUser, faHeartbeat, faDownload, faCog, faHome } from '@fortawesome/free-solid-svg-icons'
import { getSettings } from '@/store/modules/settings/utils'
import { GENERAL_NAMESPACE, USERNAME } from '@/store/modules/settings/general'

export default {
    name: 'MetaMenu',
    components: {
        Menu,
        /* eslint-disable-next-line vue/no-unused-components */
        [MenuItem.name]: MenuItem,
        Tooltip
    },
    icons: {
        faUser,
        faHeartbeat,
        faDownload,
        faCog,
        faHome
    },
    computed: getSettings(GENERAL_NAMESPACE, {
        username: USERNAME
    })
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

        &:hover,
        &:focus {
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
