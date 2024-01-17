import React from 'react'
import ClientRender from '@/components/ClientRender'
import styled from 'styled-components'

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 8px 14px -15px rgba(56, 52, 52, 0.75);
  -webkit-box-shadow: 0px 8px 14px -15px rgba(56, 52, 52, 0.75);
  -moz-box-shadow: 0px 8px 14px -15px rgba(56, 52, 52, 0.75);
`

export const HeaderWrapper = styled.div`
  width: 100%;
  /* max-width: 1200px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const Menu = styled.div`
  cursor: pointer;
  width: 30px;
  height: 17px;
`

const Header = () => {
  return (
    <ClientRender>
      <HeaderContainer>
        <HeaderWrapper></HeaderWrapper>
      </HeaderContainer>
    </ClientRender>
  )
}
export default Header
