import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const BreadcrumbContainer = styled.div`
  height: 40px;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #000000;
  display: flex;
  align-items: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  span {
    cursor: pointer;
    color: #e14d2a;
  }
`
const CurrentPage = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Breadcrumb = ({ ancestor = [], currentPage }) => {
  const router = useRouter()
  return (
    <BreadcrumbContainer>
      {ancestor.map((ancestor, index) => (
        <div key={index} className='MR3'>
          <span onClick={() => ancestor.path && router.push(ancestor.path)}>{ancestor.name}</span> /{' '}
        </div>
      ))}{' '}
      <CurrentPage>{currentPage}</CurrentPage>
    </BreadcrumbContainer>
  )
}

export default Breadcrumb
