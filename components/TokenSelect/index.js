import images from '@/common/images'
import { Select } from 'antd'
import styled from 'styled-components'
import Image from '../Image'

const Container = styled.div`
  width: 100%;
  max-width: ${(props) => (props?.width ? props?.width : '100%')};
  display: flex;
  flex-direction: column;
  background: #0a1d2c;
  border-radius: 3px;
`

const OptionContainer = styled.div`
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  line-height: 150%;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  gap: 5px;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: flex-end;
`

const CustomSelect = styled(Select)`
  width: 100%;
  max-width: 100%;
  height: 30px;
  .ant-select-selector {
    height: 30px !important;
    background: ${(props) => (props?.background ? props?.background : '#d9d9d9')} !important;
    border-radius: 3px !important;
    border: none !important;
    box-shadow: none !important;
  }
  .ant-select-selection-item {
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    display: flex;
    align-items: center;
    color: #fff !important;
    opacity: ${(props) => (props?.disabled ? 0.5 : 1)};
  }
  .ant-select-arrow {
    margin-right: 5px;
  }
  .ant-select-item-option-active {
    background: #6c757e17 !important;
  }
`

const CustomImage = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
`

const CustomOption = styled(Select.Option)`
  color: #000 !important;
`

const TokenSelect = ({ values = [], value = '', onChange, className = '', background = '#0A1D2C', disabled = false, width = '100%' }) => {
  const handleChange = (value) => {
    onChange && onChange(value)
  }

  return (
    <Container width={width} className={className}>
      <CustomSelect
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        disabled={disabled}
        background={background}
        value={`${value}`.toLowerCase()}
        onChange={(index) => handleChange(index)}
        suffixIcon={!disabled && <Image src={images.icDropdown} width={8} />}
      >
        {values.map((token) => {
          return (
            <CustomOption key={`${token?.contractAddress}`.toLowerCase()} value={`${token?.contractAddress}`.toLowerCase()}>
              <OptionContainer>
                <CustomImage alt='logo' src={token?.icon} />
                <Title>{token?.symbol}</Title>
              </OptionContainer>
            </CustomOption>
          )
        })}
      </CustomSelect>
    </Container>
  )
}

export default TokenSelect
