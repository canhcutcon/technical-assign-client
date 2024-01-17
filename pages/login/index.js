import UserAdminService from '@/controller/API/UserAdmin'
import { setUserAdmin } from '@/controller/Redux/slice/appSlice'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('/static/images/background.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 55vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #333333;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  max-width: 500px;
  text-align: center;
  @media screen and (max-width: 768px) {
    width: 80vw;
  }
`

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`

const Input = ({ type, placeholder, ...rest }) => {
  return <StyledInput type={type} placeholder={placeholder} {...rest} />
}

const StyledButton = styled(Button)`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: #ffffff !important;
  border-radius: 2rem;
  cursor: ${(props) => (props.disabled || props.loading ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.8 : 1)};
`

const Form = styled.form`
  width: 100%;
`

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const login = async () => {
    setLoading(true)
    const res = await UserAdminService.login('admin', 'admin007')
    if (res?.data) {
      dispatch(setUserAdmin(res?.data))
      router.push('/card')
    } else {
      dispatch(setUserAdmin(null))
    }
    setLoading(false)
  }

  return (
    <Container>
      <MainContainer>
        <WelcomeText>Admin</WelcomeText>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            login()
          }}
        >
          <InputContainer>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='Username' />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} className='MT20' type='password' placeholder='Password' />
          </InputContainer>
          <ButtonContainer>
            <StyledButton htmlType='submit' loading={loading} className='MT20' disabled={loading || username === '' || password === ''}>
              Login
            </StyledButton>
          </ButtonContainer>
        </Form>
      </MainContainer>
    </Container>
  )
}

// const EmptyLayout = ({ children }) => <>{children}</>
// Login.Layout = EmptyLayout
export default Login
