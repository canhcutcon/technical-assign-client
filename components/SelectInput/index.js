import images from '@/common/images'
import { Select } from 'antd'
import styled from 'styled-components'
import Image from '../Image'

const CustomSelectInput = styled(Select)`
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
      text-align: ${(props) => (props.$center ? 'center' : 'left')};
    }
  }
`

const SelectInput = ({ center = false, value, options, onChange, disabled }) => {
  return (
    <CustomSelectInput
      disabled={disabled}
      $center={center}
      value={value}
      onChange={(v) => onChange && onChange(v)}
      suffixIcon={<Image src={images.icDropdown} width={8} />}
    >
      {options?.map((option) => (
        <CustomSelectInput.Option key={option.value}>{option.name}</CustomSelectInput.Option>
      ))}
    </CustomSelectInput>
  )
}

export default SelectInput
