<template>
    <div shadow="never" class="docker-containers">
        <Table :stripe="true" class="docker-containers__table"
        :data="tableData">
            <TableColumn label="Container" prop="name" />
            <TableColumn label="Status" prop="status">
                <template slot-scope="scope">
                    <Tag
                        :type="scope.row.status === 'running' ? 'success' : scope.row.status === 'exited' ? 'danger': 'info'"
                        disable-transitions>{{scope.row.status}}</Tag>
                </template>
            </TableColumn>
            <TableColumn label="Ports" prop="ports">
                <template slot-scope="scope">
                    <SimpleLink
                        v-for="port in scope.row.ports"
                        :key="`link_${port}`"
                        :href="`http://127.0.0.1:${port}`">127.0.0.1:{{port}}</SimpleLink>
                </template>
            </TableColumn>
        </Table>
    </div>
</template>

<script>
import { Table, TableColumn, Tag } from 'element-ui'
import { namespace, types } from '@/store/modules/AppState.js'
import SimpleLink from '@/components/ContentElements/SimpleLink.vue'

export default {
    name: 'Containers',
    props: {
        courseName: {
            type: String,
            required: true
        },
        containers: {
            type: Object,
            required: true
        }
    },
    components: {
        Table,
        TableColumn,
        Tag,
        SimpleLink
    },
    data() {
        return {
        }
    },
    computed: {
        tableData() {
            let tableData = []
            for (const name in this.containers) {
                let row = {}
                row['name'] = name
                let containerName = `salp_${this.courseName}_${name}`
                row['status'] = this.$store.getters[namespace + '/' + types.GET_CONTAINER_STATUS](containerName)
                row['ports'] = this.$store.getters[namespace + '/' + types.GET_CONTAINER_PORTS_SIMPLE](containerName)
                tableData.push(row)
            }

            return tableData
        }
    },
    methods: {
        /* tableCellClassName({ row, column, rowIndex, columnIndex }) {
            console.log('row', row, ' column', column, ' rowIndex', rowIndex, ' columnIndex', columnIndex)
            if (row.status === 'running' && columnIndex === 1) {
                return 'running'
            }

            return ''
        } */
    }
}
</script>

<style lang="scss">
.docker-containers {
    .docker-containers__table {
        .running {
            background-color: rgba($color: $--color-success , $alpha: 0.25)
        }
    }
}
</style>
