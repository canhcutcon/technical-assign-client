import React from 'react'
import useInitialData from '@/hooks/useInitialData'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import MyModal from '../MyModal'
import 'react-toastify/dist/ReactToastify.css'
import useLoading from '@/hooks/useLoading'
import Loading from '../Loading'

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
`

const AppBackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${(props) => props.zIndex || 10};
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`

const AppWrapper = ({ children }) => {
  useInitialData()
  const { loading } = useLoading()
  return (
    <Wrapper>
      <Head>
        <link rel='shortcut icon' id='my-favicon' href='https://ipfs.pantograph.app/ipfs/QmQW5RztPNQ5UVwGG5vcohzpgtUDEcBLsNG7QJpBF2PTkV?filename=icon.png' />
        <title> Admin</title>
      </Head>
      {loading && (
        <AppBackgroundWrapper>
          <Loading width={280} height={280} />
        </AppBackgroundWrapper>
      )}
      {children}
      <MyModal />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </Wrapper>
  )
}

export default AppWrapper
