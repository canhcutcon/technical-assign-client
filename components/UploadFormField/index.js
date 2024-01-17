import { showNotificationError } from '@/common/function'
import images from '@/common/images'
import UploadService from '@/controller/API/Upload'
import { Form, Spin } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Image from '../Image'

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

const CustomFormItem = styled(Form.Item)`
  margin: 0;
  width: 100%;
`

const ImageContainer = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
  flex-wrap: wrap;
`

const ImageWrapper = styled.div`
  position: relative;
`

const DeleteButton = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
`

const Button = styled.div`
  background: linear-gradient(to right, #567189 0%, #7b8fa1 79%);
  letter-spacing: 0.1rem;
  border: none;
  color: #ffffff !important;
  border-radius: 2rem;
  height: 30px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  line-height: 150%;
  max-width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Error = styled.div`
  color: red;
`

const UploadFormField = ({ className = '', name, required = false, label = null, disabled, maxFile = 1, error = null }) => {
  const [blur, setBlur] = useState(false)
  return (
    <Container className={className}>
      {label && (
        <Label>
          {label}
          {required && <span>*</span>}
        </Label>
      )}
      <CustomFormItem name={name}>
        <UploadInput onBlur={() => setBlur(true)} disabled={disabled} maxFile={maxFile} />
      </CustomFormItem>
      {error && blur && <Error>{error}</Error>}
    </Container>
  )
}

export const UploadInput = ({ onBlur = null, value = [], maxFile = 1, onChange, disabled }) => {
  const [data, setData] = useState(value || [])
  const [loading, setLoading] = useState(false)
  const id = useMemo(() => {
    return Math.random().toString(36).slice(-6)
  }, [])

  useEffect(() => {
    setData(value)
  }, [value])

  const remove = (index) => {
    const arr = [...data]
    arr.splice(index, 1)
    setData(arr)
    onChange && onChange(arr)
    onBlur && onBlur()
  }

  const handleChange = async (e) => {
    const { files } = e.target
    let error = null
    if (files.length <= maxFile - data.length) {
      setLoading(true)
      const arr = await Promise.all(
        Array.from(files).map(async (file) => {
          if (file.size >= 5242880) {
            error = 'File size exceeds maximum'
            return null
          }
          const res = await UploadService.upload(file)
          if (res?.data?.url) {
            return res?.data?.url
          }
          return null
        })
      )
      const newArr = arr.filter((e) => e !== null)
      const newData = [...data, ...newArr]
      setData(newData)
      onChange && onChange(newData)
      if (error) {
        showNotificationError(error)
      }
      setLoading(false)
    } else {
      showNotificationError(`Max file: ${maxFile - data.length}`)
    }
    onBlur && onBlur()
  }

  return (
    <>
      <input
        style={{ display: 'none' }}
        id={id}
        type='file'
        disabled={disabled || loading}
        multiple={maxFile > 1}
        accept='image/png, image/gif, image/jpeg'
        onChange={handleChange}
      />
      {!disabled && data.length < maxFile && (
        <label style={{ display: 'inline-block', width: '100%', maxWidth: '150px' }} htmlFor={id}>
          <Button>
            {loading ? (
              <Spin className='MT2' size='small' />
            ) : (
              <>
                <Image className='MR5' src={images.icUpload} width={15} height={15} />
                Upload
              </>
            )}
          </Button>
        </label>
      )}
      {data.length > 0 && (
        <ImageContainer>
          {data.map((image, index) => (
            <ImageWrapper key={`${image}-${index}`}>
              <Image width={80} height={80} src={image} />
              <DeleteButton>
                <Image onClick={() => remove(index)} src={images.icRemoveImage} cursor='pointer' />
              </DeleteButton>
            </ImageWrapper>
          ))}
        </ImageContainer>
      )}
    </>
  )
}

export default UploadFormField
