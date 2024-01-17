import { Card as CardAntd } from 'antd'
import styled from 'styled-components'

const CustomCard = styled(CardAntd)`
  flex: 1;
  box-shadow: 10px 10px 10px -12px rgba(56, 52, 52, 0.75);
  border: 1px solid rgba(56, 52, 52, 0.2);
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-y: scroll !important;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  .ant-card-head {
    background: #f1f1f1;
  }
  .ant-card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    overflow-y: scroll !important;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

const Card = ({ title, children, extra, ...rest }) => {
  return (
    <CustomCard type='inner' extra={extra} title={title} bordered={false} {...rest}>
      {children}
    </CustomCard>
  )
}

export default Card
