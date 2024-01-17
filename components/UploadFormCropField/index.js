import images from '@/common/images'
import Image from '@/components/Image'
import UploadService from '@/controller/API/Upload'
import { UploadOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { showNotificationError } from 'common/function'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Loading from '../Loading'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
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
  width: 100%;
  /* max-width: 320px; */
  /* aspect-ratio: ${(props) => props.aspect || 1}; */
  position: relative;
  display: flex;
  align-items: center;
`

const CustomUpload = styled(Upload)`
  border-radius: 6px;
  box-shadow: 0 2px 32px 0 rgba(31, 38, 135, 0.27);
  border: '0.5px solid rgba(31, 38, 135, 0.27)';
  text-align: center;
  height: 64px;
`

const WrapperIcon = styled.div`
  min-height: 64px;
  display: grid;
  place-content: center;
  cursor: pointer;
`

const TextUpload = styled.div``

const RemoveButton = styled(Image)`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10;
`

const UploadFormCropField = ({ name, label = null, subLabel = null, ratio = 1, value, required = false, onChange }) => {
  const [image, setImage] = useState(value || null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (value) {
      setImage(value)
    }
  }, [value])

  const handleChangeImage = async (file) => {
    setUploading(true)
    try {
      if (file.size >= 5 * 1024 * 1024) {
        showNotificationError('File size exceeds maximum')
        setUploading(false)
        return
      }
      const res = await UploadService.upload(file)

      if (res?.data?.url) {
        setImage(res?.data?.url)
      } else {
        showNotificationError('Upload file failed')
      }
      onChange && onChange(res?.data?.url ?? null)
    } catch (error) {
      console.error(error)
      showNotificationError('Upload file failed')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveItem = () => {
    setImage(null)
    onChange && onChange(null)
  }

  return (
    <Container>
      {label && (
        <Label hasSub={!!subLabel}>
          {label}
          {required && <span>*</span>}
        </Label>
      )}
      {subLabel && <Label>{subLabel}</Label>}
      {image ? (
        <ImageContainer>
          <RemoveButton className='on-hover' onClick={handleRemoveItem} src={images.icRemoveImage} />
          <img
            src={image}
            style={{
              width: `100%`,
              objectFit: `cover`,
              height: `auto`,
            }}
          />
        </ImageContainer>
      ) : (
        <ImgCrop modalWidth={`800px`} name={name} aspect={ratio} quality={1} onModalOk={handleChangeImage}>
          <CustomUpload disabled={uploading} showUploadList={false} onPreview={false} beforeUpload={false} accept='.png,.jpg,.jpeg'>
            <ImageContainer>
              {uploading ? (
                <Loading />
              ) : (
                <WrapperIcon>
                  <UploadOutlined style={{ fontSize: '24px', color: '#091c61', margin: '0 auto' }} />
                  <TextUpload>Upload</TextUpload>
                </WrapperIcon>
              )}
            </ImageContainer>
          </CustomUpload>
        </ImgCrop>
      )}
    </Container>
  )
}

export default UploadFormCropField
