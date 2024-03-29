import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='description' content='admin' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
