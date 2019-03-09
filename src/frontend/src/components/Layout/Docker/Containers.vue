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
import ExternalLink from '@/components/Elements/ExternalLink.vue'
import { namespace as userPreferencesNamespace, types as userPreferencesTypes } from '@/store/modules/persisted/UserPreferences.js'

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
    methods: {
        // Based on: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
        formatBytes(bytes, decimals, label) {
            if (bytes === 0) {
                return '0 Bytes'
            }
            const k = 1024
            let dm = decimals <= 0 ? 0 : decimals || 2
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            const i = Math.floor(Math.log(bytes) / Math.log(k))
            let result = '' + parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
            if (label) {
                result += ' ' + sizes[i]
            }

            return result
        }
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
                    const size = this.formatBytes(this.pullProgress.current, 2, true)
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
            return this.$store.getters[userPreferencesNamespace + '/' + userPreferencesTypes.GET]('baseIp')
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
