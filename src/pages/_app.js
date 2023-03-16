/*import '@/styles/globals.css'*/
import '@/styles/styles.scss'
import { Fira_Sans } from '@next/font/google'
import { Layout } from '@/components/Layout'
import { SessionProvider } from 'next-auth/react';

/* TODO: rename this variable */
const font = Fira_Sans({
  subsets: ['latin'],
  weight: '400'
})

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <main className={font.className}>
      <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </main>
  )
}
