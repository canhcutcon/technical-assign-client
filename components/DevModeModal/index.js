import { showNotificationError, showNotificationSuccess } from '@/common/function'
import PrimaryButton from '@/components/PrimaryButton'
import TextFormField from '@/components/TextFormField'
import { setDevMode } from '@/controller/Redux/slice/appSlice'
import useModal from '@/hooks/useModal'
import { Form } from 'antd'
import { useDispatch } from 'react-redux'
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

const DevModeModal = () => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [form] = Form.useForm()

  const onSubmit = ({ password }) => {
    if (password === process.env.NEXT_PUBLIC_PASS_DEV_MODE) {
      dispatch(setDevMode(true))
      showNotificationSuccess('Dev mode enabled')
      closeModal()
    } else {
      showNotificationError('Wrong password')
      form.setFieldsValue({ password: '' })
    }
  }

  return (
    <Container onFinish={onSubmit} form={form}>
      <TextFormField className='MT10' label='Password:' name='password' type='password' />
      <ButtonContainer>
        <PrimaryButton width='220px' size='medium'>
          Enable Dev Mode
        </PrimaryButton>
      </ButtonContainer>
    </Container>
  )
}

export default DevModeModal
