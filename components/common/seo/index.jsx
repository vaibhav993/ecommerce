import { memo } from 'react'

import Head from 'next/head'

const SEO = memo(() => (
  <>
    <Head>
      <title key="title">
        TeeRex Store
      </title>
      <meta
        key="description"
        name="description"
        content={'Best place to shop'}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  </>
))

SEO.displayName = 'SEO'
export default SEO