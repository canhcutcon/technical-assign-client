import React from 'react'
import classNames from 'classnames'
import { Button } from 'antd'
import styled, { css } from 'styled-components'

const CustomButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  min-height: unset;
  padding: 8px 15px;
  background: #eb5757;
  color: #ffffff;
  border-radius: 25px;
  span {
    color: #ffffff !important;
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
  &.full-width {
    flex: 1;
  }
  &.disabled {
    opacity: 0.4;
    background: #eb5757;
    color: #ffffff;
    &:hover {
      opacity: 0.4;
      background: #eb5757;
      color: #ffffff;
    }
  }
  &:focus {
    background: #eb5757;
    color: #ffffff;
  }
  &:hover {
    opacity: 0.8;
    background: #eb5757;
    color: #ffffff;
  }
  ${(props) =>
    props.width &&
    css`
      width: 100%;
      max-width: ${props.width};
    `}
`

const CancelButton = ({ children, className = '', fullWidth = false, size = 'medium', disabled, width = null, ...rest }) => {
  return (
    <CustomButton
      disabled={disabled}
      className={classNames(`pri-btn ${className} ${size}`, { 'full-width': fullWidth, disabled: disabled })}
      width={width}
      {...rest}
    >
      {children}
    </CustomButton>
  )
}

export default CancelButton
