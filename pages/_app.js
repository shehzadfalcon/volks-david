import '../styles/globals.css'
import Layout from "../components/_App/Layout"

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return(
  <Layout>
    <Component {...pageProps} />
  </Layout>

  )
}

export default MyApp
