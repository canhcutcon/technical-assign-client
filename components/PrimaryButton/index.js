import { Button } from 'antd'
import classNames from 'classnames'
import styled, { css } from 'styled-components'

const CustomButton = styled(Button)`
  background: ${(props) => (props.color ? props.color : 'linear-gradient(to right,#14163c 0%,#052b9d 69%)')};
  letter-spacing: 0.1rem;
  border: none;
  color: #ffffff !important;
  cursor: ${(props) => (props.disabled || props.loading ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.8 : 1)};
  &.full-width {
    flex: 1;
  }
  &.small {
    height: 30px;
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
  }
  &.medium {
    height: 40px;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
  }
  &.large {
    height: 50px;
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
  }
  ${(props) =>
    props.width &&
    css`
      width: 100%;
      max-width: ${props.width};
    `}
`

const PrimaryButton = ({
  children,
  className = '',
  color = null,
  fullWidth = false,
  size = 'medium',
  disabled,
  width = null,
  textColor = '#ffffff',
  ...rest
}) => {
  return (
    <CustomButton
      disabled={disabled}
      color={color}
      $textColor={textColor}
      htmlType='submit'
      className={classNames(`pri-btn ${className} ${size}`, { 'full-width': fullWidth, disabled: disabled })}
      width={width}
      {...rest}
    >
      {children}
    </CustomButton>
  )
}

export default PrimaryButton
