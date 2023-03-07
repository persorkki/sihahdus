/*import '@/styles/globals.css'*/
import '@/styles/styles.scss'
import { Fira_Sans } from '@next/font/google'
import { Layout } from '@/components/Layout'

/* TODO: rename this variable */
const inter = Fira_Sans({
  subsets: ['latin'],
  weight: '400'
})

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}
