import styled from 'styled-components'

const Container = styled.div`
  color: ${(props) => (props.status ? props.yesColor : props.noColor)};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Status = ({ status, yesColor = 'green', noColor = 'red', skip = false }) => {
  if (skip) return <span> - </span>
  return (
    <Container status={status} yesColor={yesColor} noColor={noColor}>
      {status ? 'YES' : 'NO'}
    </Container>
  )
}

export default Status
