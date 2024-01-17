import { showNotificationError, showNotificationSuccess } from '@/common/function'
import { QUERY_KEY } from '@/common/query-key'
import PrimaryButton from '@/components/PrimaryButton'
import SelectFormField from '@/components/SelectFormField'
import TextFormField from '@/components/TextFormField'
import UploadFormField from '@/components/UploadFormField'
import CardService from '@/controller/API/Card'
import useModal from '@/hooks/useModal'
import { Form, Popover, Image, Button } from 'antd'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import styled from 'styled-components'
import { MinusCircleOutlined } from '@ant-design/icons'
import UploadField from '@/components/UploadField'
import { OBSERVER_KEY } from '@/common/constants'
import Observer from '@/common/observer'

const Container = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding: 0px 15px 25px 15px;
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

const Flex = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  gap: 8px;

  .ant-form-item {
    &:first-child {
      flex: 0.5;
    }

    flex: 1;
  }

  &.has-group {
    padding: 10px;
    border: 1px dashed #bdbdbd;
    border-radius: 10px;
  }
`

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`

const GroupContainer = styled.fieldset`
  legend {
    width: fit-content;
    border: none;
    margin: 0px !important;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px dashed #bdbdbd;
`

const RATE_CARD = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic']

const CARD_CATEGORY = ['Animal', 'Art', 'Collectible', 'Game', 'Meme', 'Music', 'Sports', 'Utility', 'Other']

const initValue = {
  name: '',
  image: '',
  price: 0,
  description: '',
  quantity: 0,
  attributes: [
    {
      trait_type: '',
      value: '',
      display_type: '',
    },
  ],
  rarity: '',
  category: '',
}

const CreateUpdateCards = ({ data }) => {
  const [form] = Form.useForm()
  const [formData, setFormData] = useState(initValue)
  const { closeModal } = useModal()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      const newPayload = {
        cardId: data?.cardId,
        name: data?.name,
        image: data?.image,
        price: data?.price,
        description: data?.description,
        quantity: data?.quantity,
        attributes: data?.attributes?.filter(
          (item) =>
            !(
              (item?.trait_type.toLowerCase() === 'type' && item?.value.toLowerCase() === defaultType.toLowerCase()) ||
              (item?.trait_type.toLowerCase() === 'goods' && item?.value.toLowerCase() === defaultGoods.toLowerCase())
            )
        ),
        rarity: data?.rarity,
        category: data?.category,
      }
      setFormData(newPayload)
      form.setFieldsValue(newPayload)
    } else {
      let initData = {
        ...initValue,
      }
      setFormData(initData)
      form.setFieldsValue(initData)
    }
  }, [data])

  const createCard = useMutation((data) => CardService.create(data), {
    onSuccess: async (res) => {
      if (res?.data) {
        await queryClient.invalidateQueries(QUERY_KEY.card)
        Observer.emit(OBSERVER_KEY.CARD_RELOAD)
        showNotificationSuccess('Create success')
        form.resetFields()
        closeModal()
      }
    },
    onError: (error) => {
      showNotificationError(error)
    },
  })

  const updateCard = useMutation((data) => CardService.update(data?.cardId, data?.payload), {
    onSuccess: async (res) => {
      if (res?.data) {
        await queryClient.invalidateQueries(QUERY_KEY.card)
        Observer.emit(OBSERVER_KEY.CARD_RELOAD)
        showNotificationSuccess('Update success')
        form.resetFields()
        closeModal()
      }
    },
    onError: (error) => {
      showNotificationError(error)
    },
  })

  const onSubmit = (values) => {
    const payload = {
      ...values,
      attributes: values?.attributes.filter((obj) => {
        return Object?.keys(obj)?.length !== 0 && !!obj?.trait_type && !!obj?.value
      }),
    }

    if (data) {
      updateCard.mutate({ cardId: data?.cardId, payload: payload })
    } else {
      createCard.mutate(payload)
    }
  }

  return (
    <Container onFinish={onSubmit} initialValues={formData} onValuesChange={(_, values) => setFormData(values)} form={form}>
      <TextFormField className='MT10' label='Name card:' name='name' />
      {console.log('formData', formData.image)}
      <UploadField
        className='MT10'
        required
        label='Card Image:'
        name='image'
        onChange={(e) => {
          console.log('e', e), form.setFieldValue('image', e), setFormData((prev) => ({ ...prev, image: e }))
        }}
      />
      <TextFormField className='MT10' label='Price:' name='price' />
      <TextFormField className='MT10' label='Description:' name='description' />
      <TextFormField className='MT10' label='Quantity:' name='quantity' />
      <GroupContainer>
        <Label className='MT10'>
          <div className='inline-flex items-center'>
            Attribute
            <Popover content='sss' trigger='hover'>
              <span className='ML10' style={{ cursor: 'pointer' }}>
                <Image classNam='MB3' src={'https://ipfs.pantograph.app/ipfs/QmP4x7N2W3oeDXfhMr5mQTnijdQttFKUW71dV32uQE29vL?filename=Group.png'} width={16} />
              </span>
            </Popover>
          </div>
        </Label>
        <Form.Item name='attributes'>
          <Form.List name='attributes'>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Flex key={`${field.key}-${index}`} className='MB10'>
                    <TextFormField
                      key={`other-key-${index}`}
                      placeholder='Enter key'
                      name={[field.name, 'trait_type']}
                      fieldKey={[field.fieldKey, 'trait_type']}
                    />
                    <TextFormField key={`other-value-${index}`} placeholder='Enter value' name={[field.name, 'value']} fieldKey={[field.fieldKey, 'value']} />
                    <Button
                      type='danger'
                      onClick={() => remove(field.name)}
                      icon={
                        <MinusCircleOutlined
                          style={{
                            color: 'red',
                          }}
                        />
                      }
                      style={{
                        alignSelf: 'start',
                        marginTop: '2px',
                        cursor: 'pointer',
                      }}
                    />
                  </Flex>
                ))}
                <Button type='dashed' onClick={() => add()} block size='large'>
                  Add more
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>
      </GroupContainer>

      <SelectFormField
        className='MT10'
        label='Category Card: '
        name='category'
        options={CARD_CATEGORY?.map((item) => ({ value: item, name: `${item.charAt(0).toUpperCase() + item.slice(1)}` }))}
      />

      <SelectFormField
        className='MT10'
        label='Rate Card: '
        name='rarity'
        options={RATE_CARD?.map((item) => ({ value: item, name: `${item.charAt(0).toUpperCase() + item.slice(1)}` }))}
      />

      <ButtonContainer>
        <PrimaryButton
          width='220px'
          size='medium'
          disabled={createCard.isLoading || updateCard.isLoading}
          loading={createCard.isLoading || updateCard.isLoading}
        >
          {data ? 'Update' : 'Create'}
        </PrimaryButton>
      </ButtonContainer>
    </Container>
  )
}

export default CreateUpdateCards
