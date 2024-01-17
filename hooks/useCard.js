import { useQuery } from 'react-query'
import { QUERY_KEY } from '@/common/query-key'
import ApiService from '@/controller/API/Card'
import { OBSERVER_KEY } from '@/common/constants'
import { useEffect } from 'react'
import Observer from '@/common/observer'

const getData = async ({ queryKey }) => {
  const id = queryKey[1]
  const query = queryKey[2]
  const res = await ApiService.getAll(id, query)
  return {
    items: res?.data?.items || [],
    totalPages: res?.data?.totalPages || 0,
    page: res?.data?.page || 1,
    total: res?.data?.total || 0,
    limit: res?.data.limit || 24,
  }
}

const useCards = (id, query) => {
  const { data, isLoading, refetch } = useQuery([QUERY_KEY.card, id, query], getData)

  useEffect(() => {
    Observer.on(OBSERVER_KEY.CARD_RELOAD, refetch)
    return () => Observer.removeListener(OBSERVER_KEY.CARD_RELOAD, refetch)
  }, [])

  return {
    isLoading,
    data: {
      items: data?.items || [],
      totalPages: data?.totalPages || 0,
      page: data?.page || 1,
      total: data?.total || 0,
      limit: data?.limit || 24,
    },
  }
}

export default useCards
