import { Form, Input } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Label = styled.div`
  color: #333333;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 500;
  span {
    color: red;
  }
`
const Error = styled.div`
  color: red;
`

const CustomFormItem = styled(Form.Item)`
  margin: 0;
  width: 100%;
`

const CustomInput = styled(Input)`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 32px 0 rgba(31, 38, 135, 0.27);
  width: 100%;
  height: 35px;
  border: ${(props) => (props.$error ? '1px solid red' : '0.5px solid rgba(31, 38, 135, 0.27)')};
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

const TextFormField = ({ name, label = null, required = false, type = 'text', disabled, error = null, className = '', ...rest }) => {
  const [blur, setBlur] = useState(false)
  return (
    <Container className={className}>
      {label && (
        <Label>
          {label}
          {required && <span>*</span>}
        </Label>
      )}
      <CustomFormItem name={name}>
        <CustomInput onBlur={() => setBlur(true)} disabled={disabled} type={type} {...rest} />
      </CustomFormItem>
      {error && blur && <Error>{error}</Error>}
    </Container>
  )
}

export const TextInput = CustomInput

export default TextFormField
