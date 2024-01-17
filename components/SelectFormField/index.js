import images from '@/common/images'
import { Form, Select } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import Image from '../Image'

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

const CustomInput = styled(Select)`
  width: 100%;
  background: rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 2px 32px 0 rgba(31, 38, 135, 0.27) !important;
  height: 35px;
  .ant-select-selector {
    border: 0.5px solid rgba(31, 38, 135, 0.27) !important;
    height: 35px !important;
    background: rgba(255, 255, 255, 0.15) !important;
    color: #333333;
    display: flex;
    .ant-select-selection-item {
      font-weight: 600 !important;
      margin-top: 2px;
    }
  }
`

/**
 *
 * @param {{ name: string, label: string, required?: string, options: { name: string, value: string, render: any }[], disabled?: boolean, error?: string }} param0
 * @returns
 */
const SelectFormField = ({ name, required = false, label = null, options, disabled, error = null, className = '' }) => {
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
        <CustomInput onBlur={() => setBlur(true)} disabled={disabled} suffixIcon={<Image src={images.icDropdown} width={8} />}>
          {options.map((option) => (
            <CustomInput.Option key={option.value}>{option.render ? option.render() : option.name}</CustomInput.Option>
          ))}
        </CustomInput>
      </CustomFormItem>
      {error && blur && <Error>{error}</Error>}
    </Container>
  )
}

export default SelectFormField
