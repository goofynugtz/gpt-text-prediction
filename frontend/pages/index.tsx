import Head from 'next/head'
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes';
import Navbar from '@/components/Navbar'
import Prediction from '@/components/Prediction'
import ModelType from '@/components/ModelType';

export default function Home() {
  const [model, setModel] = useState('')
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(theme === 'dark' ? true : false)
  }, [theme])

  return (
    <>
      <Head>
        <title>Text Prediction</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='main'>
        <Navbar {...{mounted, setMounted, theme, setTheme, resolvedTheme}}/>
        <ModelType {...{model, setModel}}/>
        <Prediction {...{model}}/>
      </main>
    </>
  )
}
