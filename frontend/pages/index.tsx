import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes';
import Navbar from '@/components/Navbar'
import Prediction from '@/components/Prediction'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(theme === 'dark' ? true : false)
  }, [theme])

  return (
    <>
      <Head>
        <title>Hello</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='main'>
        <Navbar {...{mounted, setMounted, theme, setTheme, resolvedTheme}}/>
        <Prediction/>
      </main>
    </>
  )
}
