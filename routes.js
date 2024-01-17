import ReduxService from '@/controller/Redux/redux'
import { setUserAdmin } from '@/controller/Redux/slice/appSlice'
import { LogoutOutlined, SmileOutlined } from '@ant-design/icons'

const routes = [
  {
    name: 'Admin User',
    path: '/admin-user',
    icon: () => <SmileOutlined />,
  },
  {
    name: 'Card',
    path: '/card',
    icon: () => <SmileOutlined />,
  },
  {
    name: 'Logout',
    path: '/logout',
    icon: () => <LogoutOutlined />,
    onClick: () => {
      ReduxService.callDispatchAction(setUserAdmin(null))
      ReduxService.logout()
    },
  },
]

export default routes
