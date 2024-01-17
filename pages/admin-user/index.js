import { showNotificationError, showNotificationSuccess } from '@/common/function'
import { QUERY_KEY } from '@/common/query-key'
import CardTable from '@/components/CardTable'
import PrimaryButton from '@/components/PrimaryButton'
import SecondaryButton from '@/components/SecondaryButton'
import UserAdminService from '@/controller/API/UserAdmin'
import useModal from '@/hooks/useModal'
import useAdminUser from '@/hooks/useUserAdmin'
import { Popconfirm } from 'antd'
import CreateUserAdmin from 'components-logic/CreateUserAdmin'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const TextNowrap = styled.div`
  white-space: nowrap;
`
const WrapAction = styled.div`
  display: flex;
  gap: 8px;
  float: right;
  justify-content: center;
  width: 100%;
`

const UserAdmin = () => {
  const { openModal } = useModal()
  const [query, setQuery] = useState({
    page: 1,
    limit: 24,
  })
  const { data, isLoading } = useAdminUser(query)
  const queryClient = useQueryClient()

  const onChangeQuery = (newValue) => {
    setQuery((state) => ({ ...state, ...newValue }))
  }
  const deleteUserAdmin = useMutation((data) => UserAdminService.delete(data), {
    onSuccess: async (res) => {
      if (res?.data) {
        await queryClient.invalidateQueries(QUERY_KEY.userAdmin)
        showNotificationSuccess('Delete success')
      }
    },
    onError: (e) => {
      showNotificationError(e)
    },
  })

  const onDelete = (record) => {
    deleteUserAdmin.mutate(record?._id)
  }

  const handleCreate = (record) => {
    openModal({
      content: <CreateUserAdmin data={record} />,
      header: true,
      headerTitle: record ? 'Update User Admin Info' : 'Create User Admin',
      width: '550px',
      radius: '10px',
      boxShadow: '0 2px 42px 0 rgba(31, 38, 145, 0.37)',
    })
  }

  const columns = [
    {
      title: 'No.',
      key: '_id',
      render: (...args) => {
        return <div>{args[2] + 1}</div>
      },
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (field) => <TextNowrap>{field}</TextNowrap>,
    },
    {
      title: 'User Role',
      dataIndex: 'role',
      key: 'role',
      render: (field) => <TextNowrap>{field || `admin`}</TextNowrap>,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (field) => (
        <WrapAction>
          <PrimaryButton onClick={() => handleCreate(field)} size='small'>
            Update
          </PrimaryButton>
          <Popconfirm placement='topLeft' title='Confirm Delete' onConfirm={() => onDelete(field)} okText='Yes' cancelText='No'>
            <SecondaryButton size='small'>Delete</SecondaryButton>
          </Popconfirm>
        </WrapAction>
      ),
    },
  ]

  return (
    <Container>
      <CardTable
        title={`User Admin - Total: ${data.length || 0}`}
        columns={columns}
        dataSource={data.items}
        loading={isLoading}
        onChange={(page, limit) => onChangeQuery({ page, limit })}
        extra={
          <PrimaryButton onClick={() => handleCreate()} size='small'>
            Create
          </PrimaryButton>
        }
      />
    </Container>
  )
}

export default UserAdmin
