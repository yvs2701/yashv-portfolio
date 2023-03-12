import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Poppins } from 'next/font/google'
import { Crimson_Pro } from 'next/font/google'
import Navbar from './navbar'
import userimg from '../public/professional.jpg'

const poppins = Poppins({ weight: ['600'], style: ['normal'], subsets: ['latin'] })
const crimpro = Crimson_Pro({ weight: ['600'], style: ['normal'], subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Yashvardhan Singh</title>
        <meta name="description" content="Portoflio for Yashvardhan Singh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <Image
          src={userimg}
          width={400}
        />

        <div className={styles.description}>
          <h1 className={styles.welcome + ' ' + poppins.className}> Hello <span className={'brandW ' + crimpro.className}>YV</span>orld!</h1>
        </div>
      </main>
    </>
  )
}
