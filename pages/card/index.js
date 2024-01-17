import { showNotificationError, showNotificationSuccess } from '@/common/function'
import { QUERY_KEY } from '@/common/query-key'
import CardTable from '@/components/CardTable'
import PrimaryButton from '@/components/PrimaryButton'
import SecondaryButton from '@/components/SecondaryButton'
import useModal from '@/hooks/useModal'
import useCards from '@/hooks/useCard'
import { Input, Select } from 'antd'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import styled from 'styled-components'
import CardService from '@/controller/API/Card'
import CreateUpdateCards from 'components-logic/CreateUpdateCard'
import Image from '@/components/Image'
import React from 'react'
import Observer from '@/common/observer'

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const TextNowrap = styled.div`
  white-space: nowrap;
`
const WrapAction = styled.div`
  display: flex;
  gap: 8px;
  float: right;
  justify-content: center;
  width: 100%;
`

const Text = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -webkit-box-align: center;
  align-items: center;
  flex-wrap: nowrap;
  display: flow-root;
  font-size: 14px;
  max-width: 200px;
  min-width: 100px;
  width: 100%;
  /* color: ${(props) => (props.link ? '#009cff' : 'initial')};
  cursor: ${(props) => (props.link ? 'pointer' : 'initial')}; */
`

const RATE_CARD = ['', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic']

const CARD_CATEGORY = ['', 'Animal', 'Art', 'Collectible', 'Game', 'Meme', 'Music', 'Sports', 'Utility', 'Other']

const reload = () => {
  Observer.emit(QUERY_KEY.CARD)
}

const Card = () => {
  const { openModal } = useModal()
  const [query, setQuery] = useState({
    page: 1,
    limit: 24,
    key: undefined,
  })
  const { data, isLoading, refetch } = useCards(query)

  const onChangeQuery = (newValue) => {
    setQuery((state) => ({ ...state, ...newValue }))
  }

  class InputSearch extends React.Component {
    _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        setQuery({ ...query, key: e.target.value == '' ? undefined : e.target.value })
      }
    }
    render() {
      return <Input defaultValue={query?.key} type='text' placeholder='Enter to search' style={{ width: '300px' }} onKeyDown={this._handleKeyDown} />
    }
  }

  const deleteCard = useMutation((data) => CardService.deleteOne(data?.cardId), {
    onSuccess: async (res) => {
      if (res?.data) {
        showNotificationSuccess('Delete success')
        reload()
        refetch()
      }
    },
    onError: (e) => {
      console.error('Mutation error:', e)
      showNotificationError(e)
    },
  })

  const onDelete = (record) => {
    deleteCard.mutate(record)
  }

  const handleCreate = (record) => {
    openModal({
      content: <CreateUpdateCards data={record} />,
      header: true,
      headerTitle: record ? 'Update Card Info' : 'Create Card',
      width: '550px',
      radius: '10px',
      boxShadow: '0 2px 42px 0 rgba(31, 38, 145, 0.37)',
    })
  }

  const columns = [
    {
      title: 'No.',
      key: '_id',
      render: (...args) => {
        return <div>{args[2] + 1}</div>
      },
    },
    {
      title: 'Card Id',
      dataIndex: 'cardId',
      key: 'cardId',
      render: (text) => <TextNowrap>{text}</TextNowrap>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <TextNowrap>{text}</TextNowrap>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <TextNowrap>{text}</TextNowrap>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text) => <TextNowrap>{text}</TextNowrap>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <TextNowrap>{text}</TextNowrap>,
    },
    {
      title: 'Rate',
      dataIndex: 'rarity',
      key: 'rarity',
      render: (text) => <TextNowrap>{text}</TextNowrap>,
    },
    {
      title: 'Image',
      key: 'image',
      dataIndex: 'image',
      render: (text) => <Image width={50} src={text} />,
    },
    {
      title: 'Attributes',
      key: 'attributes',
      dataIndex: 'attributes',
      render: (text) => (
        <>
          {text.map((item, index) => (
            <Text key={index}>
              {item.trait_type}-{item.value}
            </Text>
          ))}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <WrapAction>
          <SecondaryButton onClick={() => handleCreate(record)} size='small'>
            Update
          </SecondaryButton>
          <SecondaryButton onClick={() => onDelete(record)} size='small'>
            Delete
          </SecondaryButton>
        </WrapAction>
      ),
    },
  ]

  return (
    <Container>
      <div style={{ width: '100%', float: 'right' }}>
        <InputSearch />
      </div>
      <CardTable
        title={`Cards - Total: ${data.items?.length || 0}`}
        columns={columns}
        dataSource={data.items}
        loading={isLoading}
        onChange={(page, limit) => onChangeQuery({ page, limit })}
        extra={
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              Category:
              <Select
                value={query.category || ''}
                style={{ width: 100 }}
                onChange={(vl) => {
                  onChangeQuery({ category: vl })
                }}
              >
                {CARD_CATEGORY.map((item) => (
                  <Select.Option key={item}>{item}</Select.Option>
                ))}
              </Select>
              <div>Rarity:</div>
              <Select
                value={query.rarity || ''}
                style={{ width: 100 }}
                onChange={(r) => {
                  onChangeQuery({ rarity: r })
                }}
              >
                {RATE_CARD.map((item) => (
                  <Select.Option key={item}>{item}</Select.Option>
                ))}
              </Select>
              <PrimaryButton onClick={() => handleStore()}>Create</PrimaryButton>
            </div>
          </>
        }
      />
    </Container>
  )
}

export default Card
