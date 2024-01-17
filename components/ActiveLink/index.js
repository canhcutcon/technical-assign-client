import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { lowerCase } from '@/common/function'

const ActiveLinkContainer = styled.a`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: #333333;
  &.active {
    color: #c6171c;
  }
  &:hover {
    color: #c6171c;
  }
`

const ActiveLinkDivContainer = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: #333333;
  &.active {
    color: #c6171c;
  }
  &:hover {
    color: #c6171c;
  }
`

const ActiveLink = ({ href = '', routeActive = [], children, className = '', onClick, ...rest }) => {
  const route = useRouter()
  const routes = [...routeActive.map((item) => lowerCase(item)), href.toLowerCase()]

  if (onClick) {
    return (
      <ActiveLinkDivContainer
        onClick={() => {
          onClick()
          route.push(href)
        }}
        className={`${className} ${routes.includes(lowerCase(route.asPath)) ? 'active' : ''}`}
        {...rest}
      >
        {children}
      </ActiveLinkDivContainer>
    )
  }

  return (
    <Link href={href}>
      <ActiveLinkContainer className={`${className} ${routes.includes(lowerCase(route.asPath)) ? 'active' : ''}`} href={href} {...rest}>
        {children}
      </ActiveLinkContainer>
    </Link>
  )
}

export default ActiveLink
