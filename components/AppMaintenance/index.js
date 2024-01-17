import { showNotificationError } from '@/common/function'
import { setDevMode } from '@/controller/Redux/slice/appSlice'
import { Form } from 'antd'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
// import LoadingBike from '../LoadingBike'
import TextFormField from '../TextFormField'

const AppBackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${(props) => props.zIndex || 10};
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`

const AppMaintenance = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  return (
    <AppBackgroundWrapper style={{ flexDirection: 'column' }}>
      {/* <LoadingBike width={280} height={280} /> */}
      <h1 style={{ color: '#333', textTransform: 'uppercase', letterSpacing: '0.5rem' }}>Maintenance</h1>
      <Form
        form={form}
        onFinish={({ password }) => {
          if (password === process.env.NEXT_PUBLIC_PASS_DEV_MODE) {
            dispatch(setDevMode(true))
          } else {
            showNotificationError('Wrong password')
            form.setFieldsValue({ password: '' })
          }
        }}
      >
        <TextFormField name='password' type='password' placeholder='Password Dev Mode' />
      </Form>
    </AppBackgroundWrapper>
  )
}

export default AppMaintenance
