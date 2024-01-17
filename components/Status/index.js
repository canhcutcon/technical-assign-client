import styled from 'styled-components'

const Container = styled.div`
  color: ${(props) => (props.status === 'ready_to_use' ? 'blue' : props.status === 'has_to_backup' ? 'orange' : 'green')};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Status = ({ status }) => {
  return <Container status={status}>{status}</Container>
}

export default Status
