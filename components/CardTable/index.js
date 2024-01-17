import { Pagination, Spin } from 'antd'
import styled from 'styled-components'
import Card from '../Card'
import Table from '../Table'

const PaginationContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
`

const CardTable = ({ title, loading, columns, dataSource, total, page, limit, totalPages, extra, onChange, onChangeTable = null, ...rest }) => {
  return (
    <Card title={title} extra={extra}>
      {loading ? <Spin /> : <Table loading={loading} columns={columns} dataSource={dataSource} onChange={onChangeTable} {...rest} />}
      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination current={page || 1} total={total || 0} pageSize={limit || 24} onChange={(page, pageSize) => onChange && onChange(page, pageSize)} />
        </PaginationContainer>
      )}
    </Card>
  )
}

export default CardTable
