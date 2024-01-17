import { showNotificationError, showNotificationSuccess } from '@/common/function'
import { QUERY_KEY } from '@/common/query-key'
import PrimaryButton from '@/components/PrimaryButton'
import SelectFormField from '@/components/SelectFormField'
import TextFormField from '@/components/TextFormField'
import UserAdminService from '@/controller/API/UserAdmin'
import useModal from '@/hooks/useModal'
import { Form } from 'antd'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import styled from 'styled-components'

const Container = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding: 0px 15px 25px 15px;
`

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`

const initValue = {
  username: '',
  password: '',
  role: '',
}
const adminRole = ['test', 'admin']

const CreateUserAdmin = ({ data }) => {
  const [form] = Form.useForm()
  const [formData, setFormData] = useState(initValue)
  const { closeModal } = useModal()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      const newPayload = {
        ...data,
      }
      setFormData(newPayload)
      form.setFieldsValue(newPayload)
    } else {
      let initData = {
        ...initValue,
      }
      setFormData(initData)
      form.setFieldsValue(initData)
    }
  }, [data])

  const createUserAdmin = useMutation((data) => UserAdminService.create(data), {
    onSuccess: async (res) => {
      if (res?.data) {
        await queryClient.invalidateQueries(QUERY_KEY.userAdmin)
        showNotificationSuccess('Create success')
        form.resetFields()
        closeModal()
      }
    },
    onError: (error) => {
      showNotificationError(error)
    },
  })

  const updateUserAdmin = useMutation((data) => UserAdminService.update(data.id, data.payload), {
    onSuccess: async (res) => {
      if (res?.data) {
        await queryClient.invalidateQueries(QUERY_KEY.userAdmin)
        showNotificationSuccess('Update success')
        form.resetFields()
        closeModal()
      }
    },
    onError: (error) => {
      showNotificationError(error)
    },
  })

  const onSubmit = (values) => {
    const payload = {
      ...values,
    }
    if (!payload?.password) {
      delete payload.password
    }
    if (data) {
      updateUserAdmin.mutate({ id: data?._id, payload: payload })
    } else {
      createUserAdmin.mutate(payload)
    }
  }

  return (
    <Container onFinish={onSubmit} initialValues={formData} onValuesChange={(_, values) => setFormData(values)} form={form}>
      <TextFormField className='MT10' label='Username:' name='username' />
      <TextFormField className='MT10' label='Password:' name='password' />
      <SelectFormField
        className='MT10'
        label='Role: '
        name='role'
        options={adminRole?.map((item) => ({ value: item, name: `${item.charAt(0).toUpperCase() + item.slice(1)}` }))}
      />

      <ButtonContainer>
        <PrimaryButton width='220px' size='medium' disabled={createUserAdmin.isLoading} loading={createUserAdmin.loading}>
          {data ? 'Update' : 'Create'}
        </PrimaryButton>
      </ButtonContainer>
    </Container>
  )
}

export default CreateUserAdmin
