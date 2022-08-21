import SEO from '../components/common/seo'
import Layout from '../components/layout'
import { StoreProvider } from '../hooks/useStore'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <SEO />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

export default MyApp
