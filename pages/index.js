import { Row } from 'antd'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Home = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/card')
  }, [])

  return <div>aaaaaa</div>
}

export default Home
