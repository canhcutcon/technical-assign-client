import { Table as TableAntd } from 'antd'
import styled from 'styled-components'

const CustomTable = styled(TableAntd)`
  flex: 1;
`

const Table = ({ loading, columns, dataSource, rowKey = '_id', ...rest }) => {
  return (
    <CustomTable
      rowKey={rowKey}
      loading={loading}
      columns={columns}
      pagination={false}
      dataSource={dataSource}
      {...rest}
      locale={{
        emptyText: 'Empty',
      }}
    />
  )
}

export default Table
