<script>
import { Table, TableColumn } from 'element-ui'

export default {
    name: 'Table',
    functional: true,
    components: {
        Table,
        TableColumn
    },
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    render(createElement, context) {
        const { props } = context

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        }

        const columnData = props.data[0]
        let column = []
        for (let label in columnData) {
            if (columnData.hasOwnProperty(label)) {
                column.push(
                    createElement(
                        TableColumn,
                        {
                            staticClass: `contentelement-tabel contentelement-table__column`,
                            attrs: {
                                prop: label,
                                label: capitalizeFirstLetter(label)
                            }
                        }
                    )
                )
            }
        }

        return createElement(
            Table,
            {
                staticClass: `contentelement-table`,
                attrs: {
                    data: props.data
                },
                props: {
                    stripe: true
                }
            },
            column
        )
    }
}
</script>
