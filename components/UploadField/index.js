import { showNotificationError } from '@/common/function'
import images from '@/common/images'
import UploadService from '@/controller/API/Upload'
import { UploadOutlined } from '@ant-design/icons'
import { Form, Spin } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import Image from '../Image'
import { OBSERVER_KEY } from '@/common/constants'
import Observer from '@/common/observer'

const CustomFormItem = styled(Form.Item)`
  margin: 0;
  width: 100%;
`
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Label = styled.div`
  color: #333333;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 500;
  span {
    color: red;
  }
`

const ImageContainer = styled.div`
  position: relative;
  border-radius: 6px;
  box-shadow: 0 2px 32px 0 rgba(31, 38, 135, 0.27);
  border: '0.5px solid rgba(31, 38, 135, 0.27)';
  text-align: center;
`

const DeleteButton = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  ${(props) =>
    props.disabled &&
    css`
      cursor: no-drop;
      pointer-events: none;
    `}
`

const ImageWrapper = styled.div`
  position: relative;
`

const LabelInput = styled.label`
  position: relative;
  border-radius: 6px;
  box-shadow: 0 2px 32px 0 rgba(31, 38, 135, 0.27);
  border: '0.5px solid rgba(31, 38, 135, 0.27)';
  text-align: center;
  height: 200px;
  width: 200px;
  display: grid;
  place-content: center;
  margin: 0 auto;
  overflow: hidden;
`

const WrapperIcon = styled.div`
  min-height: 64px;
  display: grid;
  place-content: center;
  cursor: pointer;
`
const Error = styled.div`
  color: red;
`
const TextUpload = styled.div``

const UploadField = ({ className = '', name, required = false, label = null, disabled, maxFile = 1, error = null, onChange }) => {
  const [blur, setBlur] = useState(false)

  useEffect(() => {
    const resetBlur = () => {
      setBlur(false)
    }
    Observer.on(OBSERVER_KEY.RESET_UPLOAD, resetBlur)
    return () => Observer.removeListener(OBSERVER_KEY.RESET_UPLOAD, resetBlur)
  }, [])

  return (
    <Container className={className}>
      {label && (
        <Label>
          {label}
          {required && <span>*</span>}
        </Label>
      )}
      <CustomFormItem name={name}>
        <Upload onBlur={() => setBlur(true)} disabled={disabled} maxFile={maxFile} onChange={onChange} />
      </CustomFormItem>
      {error && blur && <Error>{error}</Error>}
    </Container>
  )
}

const Upload = ({ onBlur = null, value = null, onChange, disabled }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const id = useMemo(() => {
    return Math.random().toString(36).slice(-6)
  }, [])

  useEffect(() => {
    setData(value)
  }, [value])

  const remove = () => {
    setData(null)
    onChange && onChange(null)
    onBlur && onBlur()
  }

  const handleChange = async (e) => {
    setLoading(true)
    const { files } = e.target
    try {
      const arr = await Promise.all(
        Array.from(files).map(async (file) => {
          if (file.size >= 5242880) {
            showNotificationError('Image size larger than 5MB')
            return null
          }
          const res = await UploadService.upload(file)
          if (res?.data.url) {
            return res?.data?.url
          }
          return null
        })
      )
      setData(arr[0] ?? null)
      onChange && onChange(arr[0] ?? null)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      onBlur && onBlur()
    }
  }

  return (
    <>
      <input style={{ display: 'none' }} id={id} type='file' disabled={disabled || loading} accept='image/png, image/gif, image/jpeg' onChange={handleChange} />
      {data ? (
        <ImageContainer>
          <ImageWrapper>
            <Image height={120} src={data} />
            <DeleteButton disabled={disabled}>
              <Image onClick={remove} src={images.icRemoveImage} cursor='pointer' />
            </DeleteButton>
          </ImageWrapper>
        </ImageContainer>
      ) : (
        <LabelInput htmlFor={id}>
          {loading ? (
            <Spin className='MT2' size='small' />
          ) : (
            <WrapperIcon>
              <UploadOutlined style={{ fontSize: '24px', color: '#091c61', margin: '0 auto' }} />
              <TextUpload>Upload</TextUpload>
            </WrapperIcon>
          )}
        </LabelInput>
      )}
    </>
  )
}

export default UploadField
