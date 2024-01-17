import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #c9c9c9;
  color: #c9c9c9;
`

const Footer = () => {
  const year = new Date().getFullYear()
  return <Container>© {year} Admin</Container>
}

export default Footer
