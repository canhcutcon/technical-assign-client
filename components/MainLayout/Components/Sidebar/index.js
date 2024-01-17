/* eslint-disable no-unused-vars */
import React from 'react'
import { lowerCase } from '@/common/function'
import DevModeModal from '@/components/DevModeModal'
import Image from '@/components/Image'
import { setDevMode } from '@/controller/Redux/slice/appSlice'
import useModal from '@/hooks/useModal'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Switch } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import routes from 'routes'
import styled, { css } from 'styled-components'

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 250px;
  overflow-y: scroll;
  overflow-y: scroll !important;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  background: black;
  @media screen and (max-width: 768px) {
    position: fixed;
    width: 100vw;
  }
  box-shadow: 8px 0px 14px -10px rgba(56, 52, 52, 0.75);
  -webkit-box-shadow: 8px 0px 14px -10px rgba(56, 52, 52, 0.75);
  -moz-box-shadow: 8px 0px 14px -10px rgba(56, 52, 52, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const LogoContainer = styled.div`
  width: 100%;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LinkContainer = styled.div`
  padding: 10px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const ItemContainer = styled.div`
  width: 100%;
`
const SubItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const Item = styled.div`
  width: 100%;
  padding: 15px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  &:hover {
    /* background: rgba(225, 77, 42, 0.3); */
    color: #e14d2a;
  }
  ${(props) =>
    props.$active &&
    css`
      background: rgba(225, 77, 42, 0.3);
      color: #e14d2a;
    `}
`
const SubItem = styled.div`
  width: 90%;
  padding: 15px;
  color: #ffffff;
  cursor: pointer;
  /* &:hover {
    color: #e14d2a;
    .anticon {
      color: #e14d2a;
    }
  } */
  ${(props) =>
    props.$active &&
    css`
      color: #e14d2a;
      .anticon {
        color: #e14d2a;
      }
    `}
`

const Top = styled.div``
const Bottom = styled.div`
  padding: 20px;
  height: 70px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
  color: #ffffff;
`

const Sidebar = () => {
  const dispatch = useDispatch()
  const { devMode, userAdmin } = useSelector((state) => state.app)
  const userRole = userAdmin?.user?.role || ''
  const { openModal } = useModal()
  return (
    <Container>
      <Top>
        <LogoContainer className='MT50'>
          <Image
            onDoubleClick={() => {
              if (!devMode) {
                openModal({
                  content: <DevModeModal />,
                  header: true,
                  headerTitle: 'Dev Mode',
                  width: '550px',
                  radius: '10px',
                  boxShadow: '0 2px 42px 0 rgba(31, 38, 145, 0.37)',
                })
              }
            }}
            width={70}
            height={70}
            src='https://ipfs.pantograph.app/ipfs/QmSpC63zmZghoJhGxRyN4tzUwEvMnhvXASeZvWxD7pqjw6'
          />
        </LogoContainer>
        <LinkContainer>
          {routes.map((route, index) => {
            if ((route.hideNormal && !devMode) || (route.roles && !route.roles?.includes(userRole))) {
              return <React.Fragment key={index} />
            }
            if (route.path || (route.onClick && !route.routes)) {
              return <SidebarItem key={`${route.name}-${index}`} href={route.path} onClick={route.onClick} name={route.name} icon={route.icon} />
            }
            if (route.routes?.length > 0) {
              return <SidebarSubItem key={`${route.name}-${index}`} name={route.name} routes={route.routes} icon={route.icon} />
            }
          })}
        </LinkContainer>
      </Top>
      {devMode && (
        <Bottom className='MT50'>
          Dev mode:
          <Switch
            checked={devMode}
            onChange={(v) => {
              if (v) {
                openModal({
                  content: <DevModeModal />,
                  header: true,
                  headerTitle: 'Dev Mode',
                  width: '550px',
                  radius: '10px',
                  boxShadow: '0 2px 42px 0 rgba(31, 38, 145, 0.37)',
                })
              } else {
                dispatch(setDevMode(v))
              }
            }}
          />
        </Bottom>
      )}
    </Container>
  )
}

const SidebarItem = ({ href = '', routeActive = [], name, onClick, className = '', icon, ...rest }) => {
  const route = useRouter()
  const routes = [...routeActive.map((item) => lowerCase(item)), lowerCase(href)]
  return (
    <Item className={className} $active={routes.includes(lowerCase(route.asPath))} onClick={onClick ? () => onClick() : () => route.push(href)} {...rest}>
      <NameContainer>
        {icon && icon()}
        {name}
      </NameContainer>
    </Item>
  )
}

const SidebarSubItem = ({ name, routes, className, icon }) => {
  const router = useRouter()
  const { devMode } = useSelector((state) => state.app)
  const [hover, setHover] = useState(false)
  const [expand, setExpand] = useState(false)

  const active = useMemo(() => {
    return routes.map((item) => item?.path?.toLowerCase())?.includes(router.asPath?.toLowerCase())
  }, [routes, router.asPath])

  useEffect(() => {
    if (active) {
      setExpand(true)
    }
  }, [])

  return (
    <ItemContainer className={className}>
      {/* <Item $active={active || hover} onClick={() => setExpand(!expand)}> */}
      <Item $active={active} onClick={() => setExpand(!expand)}>
        <NameContainer>
          {icon && icon()}
          {name}
        </NameContainer>{' '}
        {expand ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </Item>
      {expand && (
        <SubItemContainer>
          {routes.map((route, index) => {
            const routeActive = route?.path?.toLowerCase() === router.asPath?.toLowerCase()
            if (route.hideNormal && !devMode) {
              return <></>
            }
            return (
              <SubItem
                onClick={route.onClick ? () => route.onClick() : () => router.push(route.path)}
                $active={routeActive}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                key={`${route.name}--${index}`}
              >
                <NameContainer>
                  {route.icon && route.icon()}
                  <span className='MT3'>{route.name}</span>
                </NameContainer>
              </SubItem>
            )
          })}
        </SubItemContainer>
      )}
    </ItemContainer>
  )
}

export default Sidebar
