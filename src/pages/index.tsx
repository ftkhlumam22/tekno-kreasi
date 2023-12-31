import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Layout } from '@/modules/layout-2'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Tekno Kreasi</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/tekno-kreasi-logo.svg" />
      </Head>
     <Layout/>
    </>
  )
}
