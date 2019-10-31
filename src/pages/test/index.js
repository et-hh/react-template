import PaginationTable from '@/components/PaginationTable'
import guid from '@/utils/guid'

const columns = [
  {
    title: '意图名称',
    dataIndex: 'name',
  },
]

const data = [
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
  { name: '人员伤亡' },
].map((it, idx) => ((it.key = guid()), (it.name += idx), it))

export default function() {
  return (
    <div>
      <PaginationTable
        url="/apiPlatform/intent/list"
        columns={columns}
        params={{ robotId: 122 }}
        data={data}
      ></PaginationTable>
    </div>
  )
}
