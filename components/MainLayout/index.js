import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Media from 'react-media'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'

const MainLayoutContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  background-color: #ffffff;
`
const SidebarMargin = styled.div`
  width: 250px;
`

const RightSide = styled.div`
  min-height: 100vh;
  flex: 1;
  max-width: ${(props) => (props.sidebar ? 'calc(100vw - 250px)' : '100vw')};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Body = styled.div`
  width: 100%;
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  overflow-y: scroll !important;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

const MainLayout = ({ children }) => {
  const router = useRouter()
  const { sidebar, userAdmin } = useSelector((state) => state.app)

  useEffect(() => {
    if (!userAdmin) {
      router.push('/login')
    }
  }, [userAdmin])

  return (
    <Media
      queries={{
        small: '(max-width: 768px)',
        large: '(min-width: 769px)',
      }}
    >
      {(matches) => (
        <>
          {matches.small && (
            <MainLayoutContainer style={{ justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>
              Your web browser is not supported.
            </MainLayoutContainer>
          )}
          {matches.large && (
            <MainLayoutContainer>
              {sidebar && <Sidebar />}
              {sidebar && <SidebarMargin />}
              <RightSide sidebar={sidebar}>
                <Header />
                <Body>{children}</Body>
                <Footer />
              </RightSide>
            </MainLayoutContainer>
          )}
        </>
      )}
    </Media>
  )
}

export default MainLayout
