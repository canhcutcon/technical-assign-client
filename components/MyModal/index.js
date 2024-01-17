import React from 'react'
import { ZINDEX } from '@/common/constants'
import { setModal } from '@/controller/Redux/slice/appSlice'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import Image from '../Image'
import useModal from '@/hooks/useModal'
import images from '@/common/images'

const ModalMaskWrapper = styled.div`
  display: ${(props) => (props.close ? 'none' : 'flex')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${ZINDEX.MODAL};
  min-width: 100vw;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
  justify-content: center;
  align-items: center;
  padding: 30px;
`

const ModalContainer = styled.div`
  width: 100%;
  height: ${(props) => props.height || 'auto'};
  max-width: ${(props) => props.width};
  max-height: ${(props) => props.height};
  border-radius: ${(props) => props.radius};
  position: relative;
  ${(props) =>
    props.boxShadow &&
    css`
      box-shadow: ${props.boxShadow};
      border: 1px solid rgba(31, 38, 135, 0.27) !important;
    `}
  &.open {
    animation: appear 0.2s ease;
    @keyframes appear {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: ${(props) => props.radius};
    background: ${(props) => props.background || '#ffffff'};
    opacity: ${(props) => props.opacity || 0.3};
  }
`

const ModalContent = styled.div`
  z-index: 2;
  width: 100%;
  height: 100%;
  max-height: 90vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-radius: ${(props) => props.radius};
  background: #ffffff;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 15px 0px 15px;
`

const HeaderText = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  color: #061927;
`

const MyModal = () => {
  const { closeModal } = useModal()
  const modal = useSelector((state) => state.app.modal)
  const dispatch = useDispatch()
  const modalRef = useRef()
  useOnClickOutside(modalRef, () => {
    if (modal) {
      dispatch(setModal(null))
    }
  })

  return (
    <ModalMaskWrapper close={!modal}>
      <ModalContainer
        ref={modalRef}
        width={modal?.width || 'auto'}
        height={modal?.height || 'auto'}
        radius={modal?.radius || '10px'}
        background={modal?.background}
        opacity={modal?.opacity}
        boxShadow={modal?.boxShadow}
        className={modal ? 'open' : ''}
      >
        <ModalContent radius={modal?.radius || '10px'}>
          {modal?.header &&
            (typeof modal.header === 'boolean' ? (
              <Header>
                <HeaderText>{modal?.headerTitle || ''}</HeaderText>
                <Image cursor='pointer' onClick={() => closeModal()} src={images.icClose} />
              </Header>
            ) : (
              typeof modal.header === 'function' && modal.header()
            ))}
          {modal?.content}
        </ModalContent>
      </ModalContainer>
    </ModalMaskWrapper>
  )
}

export default MyModal
