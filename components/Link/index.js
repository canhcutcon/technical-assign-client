import styled from 'styled-components'

const Div = styled.div`
  color: #009cff;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    opacity: 0.7;
  }
`
const A = styled.a`
  color: #009cff;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`

const Link = ({ children, onClick, href, target, ...rest }) => {
  if (onClick) {
    return (
      <Div onClick={onClick} {...rest}>
        {children}
      </Div>
    )
  }

  return (
    <A href={href} target={target} {...rest}>
      {children}
    </A>
  )
}

export default Link
