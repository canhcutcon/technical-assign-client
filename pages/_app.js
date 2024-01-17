import React from 'react'
import '../styles/globals.scss'
import 'antd/dist/reset.css'
import { Provider } from 'react-redux'
import { store } from '../controller/Redux/store'
import AppWrapper from '@/components/AppWrapper'
import { QueryClientProvider, QueryClient } from 'react-query'
import ClientRender from '@/components/ClientRender'
import MainLayout from '@/components/MainLayout'
import { ConfigProvider } from 'antd'
import AfterInitApp from '@/components/AfterInitApp'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || MainLayout
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  })

  return (
    <QueryClientProvider client={client}>
      <ConfigProvider>
        <Provider store={store}>
          <AppWrapper>
            <ClientRender>
              <Layout>
                <Component {...pageProps} />
                <AfterInitApp />
              </Layout>
            </ClientRender>
          </AppWrapper>
        </Provider>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default MyApp
