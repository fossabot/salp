<template>
    <div class="container-overview">
        <h1>{{ $t('Docker.overview') }}</h1>
        <Table :stripe="true" class="docker-containers__table"
        :data="tableData">
            <TableColumn label="Container Name" prop="fullname" />
            <TableColumn :label="$t('App.pages.course')" prop="course" />
            <TableColumn label="Image" prop="image" />
            <TableColumn label="Status" prop="status">
                <template slot-scope="scope">
                    <Tag
                        :type="scope.row.status === 'running' ? 'success' : scope.row.status === 'exited' ? 'danger': 'info'"
                        disable-transitions>{{scope.row.status}}</Tag>
                </template>
            </TableColumn>
            <TableColumn label="Ports" prop="ports">
                <template slot-scope="scope">
                    <ExternalLink
                        v-for="port in scope.row.ports"
                        :key="`link_${port}`"
                        :href="`http://${baseIp}:${port}`">{{baseIp}}:{{port}}</ExternalLink>
                </template>
            </TableColumn>
        </Table>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { Table, TableColumn, Tag } from 'element-ui'
import { namespace, types } from '@/store/modules/AppState.js'
import ExternalLink from '@/components/Elements/ExternalLink.vue'

export default {
    name: 'ContainerOverview',
    components: {
        Table,
        TableColumn,
        Tag,

        ExternalLink
    },
    computed: {
        allSalpContainers() {
            return this.$store.getters[namespace + '/' + types.GET_ALL_CONTAINERS]
        },
        tableData() {
            let tableData = []
            for (const name in this.allSalpContainers) {
                let row = {}
                const splitedName = name.split('_')
                row['fullname'] = name
                row['course'] = splitedName[1]
                row['image'] = splitedName[2]
                row['status'] = this.$store.getters[namespace + '/' + types.GET_CONTAINER_STATUS](name)
                row['ports'] = this.$store.getters[namespace + '/' + types.GET_CONTAINER_PORTS_SIMPLE](name)
                tableData.push(row)
            }

            return tableData
        },
        baseIp() {
            return this.$store.state.settings.docker['base_ip']
        }
    },
    mounted() {
        ipcRenderer.send('docker:getAllContainers')
    }
}
</script>
