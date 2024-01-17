import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, Tooltip, Popover, Input, Empty, Checkbox } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import Image from '@/components/Image'
import useInfoFilterStore from '@/hooks/useInfoFilterStore'

const { Search } = Input

const Container = styled.div`
  position: relative;
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`
const CustomSearch = styled(Search)``

const WrapSelect = styled.div`
  height: 100%;
  max-height: 200px;
  width: 100%;
  max-width: 200px;
  /* padding: 16px 0; */
  overflow-y: auto;
  overflow-x: hidden;
`

const CheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  gap: 8px;
  flex-direction: column;

  .ant-checkbox-wrapper {
    margin-inline-start: 0px;
  }

  .ant-checkbox {
    align-self: normal;

    &:after {
      border: none;
    }
  }
`

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: #f1f1f1;
`

const Item = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`
const ItemContent = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Row = styled.div`
  position: relative;
`

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`

const CustomCheckboxGroup = styled(Checkbox.Group)`
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
`

const CustomCheckbox = styled(Checkbox)`
  background: #fff;
  padding: 4px 0px;
  align-items: center;
  border-radius: 24px;
  color: #3c354e;

  .ant-checkbox {
    align-self: baseline;
  }
  &.ant-checkbox-wrapper {
    margin-inline-start: 0 !important;
  }
`

const ItemChain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 4px;
`

const ItemText = styled.div``

const Inner = styled.div`
  position: relative;
`

const ButtonGroup = styled.div``

const ItemCountry = ({ item }) => {
  return (
    <Checkbox value={item?.slug}>
      <Item>
        <Image src={item?.icon} width={24} height={18} />
        <ItemContent>{item?.name}</ItemContent>
      </Item>
    </Checkbox>
  )
}

const FilterTable = ({ onChange, chains, mode }) => {
  const [isOpen, setIsOpen] = useState(false)
  // const countries = useSelector((state) => state?.app?.setting?.template?.country)
  const [searchValue, setSearchValue] = useState('')
  const [chooseCountry, setChooseCountry] = useState([])
  const [chooseChains, setChooseChains] = useState([])
  const [query, setQuery] = useState({})
  const { data } = useInfoFilterStore(query)

  useEffect(() => {
    if (mode === 'report-store') {
      setQuery({ hasReport: true })
    }
    if (mode === 'report-review') {
      setQuery({ hasReviewReport: true })
    }
  }, [])

  const filterCountry = useMemo(() => {
    const result = data?.area?.filter((country) => country.name.toLowerCase().includes(searchValue.toLowerCase()))
    if (chooseCountry.length !== 0) {
      const selectedCountry = result.find((country) => country === chooseCountry)
      if (selectedCountry) {
        const filteredCountries = result.filter((country) => country !== chooseCountry)
        return [selectedCountry, ...filteredCountries]
      }
    }
    if (!searchValue) return data?.area
    return result ?? []
  }, [searchValue, chooseCountry, data])

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen)
  }

  const handleChangeCountry = (e) => {
    setChooseCountry(e)
  }

  const handleChangeChains = (e) => {
    setChooseChains(e)
  }

  const handleAllClear = () => {
    setChooseCountry([])
    setSearchValue('')
    if (chains) {
      setChooseChains([])
    }
  }

  const handleDone = () => {
    const payload = {
      countries: chooseCountry,
    }
    if (chains) {
      payload.chainIds = chooseChains
    }
    onChange(payload)
    setIsOpen(false)
    setSearchValue('')
  }

  const contentFilter = (
    <Inner>
      <Container>
        <Row>
          <Title>Country</Title>
          <CustomSearch placeholder='Search...' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <WrapSelect className='PT16 PB16'>
            {filterCountry?.length < 1 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <CheckboxGroup onChange={handleChangeCountry} value={chooseCountry}>
                {filterCountry?.map((country, index) => (
                  <ItemCountry key={index} item={country} />
                ))}
              </CheckboxGroup>
            )}
          </WrapSelect>
          <Hr />
        </Row>
        {chains && (
          <Row>
            <Title>Chain</Title>
            <WrapSelect>
              {data?.chainIds.length < 1 ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ) : (
                <CustomCheckboxGroup onChange={handleChangeChains} value={chooseChains}>
                  {data?.chainIds?.map((chain, index) => (
                    <CustomCheckbox value={chain?.chainId} key={index}>
                      <ItemChain>
                        <Image src={chain?.logo} />
                        <ItemText>{chain?.name}</ItemText>
                      </ItemChain>
                    </CustomCheckbox>
                  ))}
                </CustomCheckboxGroup>
              )}
            </WrapSelect>
          </Row>
        )}
      </Container>
      <ButtonGroup>
        <Flex>
          <Button block onClick={handleAllClear}>
            Clear
          </Button>
          <Button block type='primary' onClick={handleDone}>
            Done
          </Button>
        </Flex>
      </ButtonGroup>
    </Inner>
  )

  return (
    <Popover trigger='click' placement='bottom' open={isOpen} content={contentFilter} onOpenChange={handleOpenChange}>
      <Tooltip title='Filter'>
        <Button shape='circle' icon={<FilterOutlined />} />
      </Tooltip>
    </Popover>
  )
}

export default FilterTable
