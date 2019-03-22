<template>
    <div class="docker-containers">
        <Table :stripe="true" class="docker-containers__table"
        :data="tableData">
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
import { Table, TableColumn, Tag } from 'element-ui'
import { namespace, types } from '@/store/modules/AppState.js'
import { BASE_IP } from '@/store/modules/settings/docker'
import ExternalLink from '@/components/Elements/ExternalLink.vue'
import formatBytes from '@/utils/formatBytes.js'

export default {
    name: 'Containers',
    props: {
        courseName: {
            type: String,
            required: true
        },
        images: {
            type: Object,
            required: true
        }
    },
    components: {
        Table,
        TableColumn,
        Tag,

        ExternalLink
    },
    computed: {
        tableData() {
            let tableData = []
            for (const image in this.images) {
                let row = {}
                row['image'] = image
                let containerName = `salp_${this.courseName}_${image}`
                let status = this.$store.getters[namespace + '/' + types.GET_CONTAINER_STATUS](containerName)
                if (status === 'pulling' && this.pullProgress.current !== 0) {
                    const size = formatBytes(this.pullProgress.current, 2, true)
                    status += ' ' + size
                }
                row['status'] = status
                row['ports'] = this.$store.getters[namespace + '/' + types.GET_CONTAINER_PORTS_SIMPLE](containerName)
                tableData.push(row)
            }

            return tableData
        },
        pullProgress() {
            return this.$store.getters[namespace + '/' + types.GET_DOCKER_PULL_PROGRESS]
        },
        baseIp() {
            return this.$store.state.settings.docker[BASE_IP]
        }
    }
}
</script>

<style lang="scss">
.docker-containers {
    .docker-containers__table {
        .running {
            background-color: rgba($color: $--color-success, $alpha: 0.25);
        }
    }
}
</style>
