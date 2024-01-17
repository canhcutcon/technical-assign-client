import { useQuery } from 'react-query'
import { QUERY_KEY } from '@/common/query-key'
import ApiService from '@/controller/API/UserAdmin'

const getData = async ({ queryKey }) => {
  const query = queryKey[1]
  const res = await ApiService.getAll(query)
  return {
    items: res?.data?.items || [],
    totalPages: res?.data?.totalPages || 0,
    page: res?.data?.page || 1,
    total: res?.data?.total || 0,
    limit: res?.data.limit || 24,
  }
}

const useAdminUser = (query) => {
  const { data, isLoading } = useQuery([QUERY_KEY.userAdmin, query], getData)
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

export default useAdminUser
