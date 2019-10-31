import PaginationTable from '@/components/PaginationTable'

const columns = [
  {
    title: '意图名称',
    dataIndex: 'name',
  },
]

export default function() {
  return (
    <div>
      <PaginationTable
        url="/apiPlatform/intent/list"
        columns={columns}
        params={{ robotId: 122 }}
        selection={true}
      ></PaginationTable>
    </div>
  )
}
