<template>
  <div id="page-home">
    <Table :data="tableData">
      <TableColumn prop="date" label="Date" width="140">
      </TableColumn>
      <TableColumn prop="name" label="Name" width="120">
      </TableColumn>
      <TableColumn prop="address" label="Address">
      </TableColumn>
    </Table>
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui'

export default {
  name: 'Home',
  components: {
    Table,
    TableColumn
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
