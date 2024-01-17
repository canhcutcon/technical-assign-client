import { Form, Input } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 20px;
`

const Label = styled.div`
  color: #333333;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 500;
`

const CustomFormItem = styled(Form.Item)`
  margin: 0;
  margin-top: 3px;
`

const CustomInput = styled(Input)`
  width: 100%;
`

const CheckboxFormField = ({ name, label = null, disabled, className = '' }) => {
  return (
    <Container className={className}>
      {label && <Label>{label}</Label>}
      <CustomFormItem valuePropName='checked' name={name}>
        <CheckBoxInput disabled={disabled} />
      </CustomFormItem>
    </Container>
  )
}

export const CheckBoxInput = ({ ...rest }) => {
  return <CustomInput type='checkbox' {...rest} />
}

export default CheckboxFormField
