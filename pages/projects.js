import Head from 'next/head'
// import Image from 'next/image'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import styles from '@/styles/Projects.module.css'
import Navbar from './navbar'
import Contact from './contact'
import Footer from './footer'
import Floating from './floatinglinks'

const poppins = Poppins({ weight: ['300', '400', '500'], style: ['normal'], subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Projects - Yashvardhan Singh</title>
        <meta name="description" content="Projects developed by Yashvardhan Singh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Navbar />

      <main className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.slogan + ' ' + poppins.className}>
            A developer&nbsp;passionate about creating&nbsp;polished end&#8209;to&#8209;end products
            {/* &#8209; is the non-breaking hyphen ("-") character */}
          </h1>
          <h2 className={styles.subtitle + ' ' + poppins.className}>
            Student at VIT&nbsp;Bhopal&nbsp;University. Learning about Artificial&nbsp;Intelligence and Machine&nbsp;Learning. Web&nbsp;developer by heart.
          </h2>
          <Link href="#work-grid" className={styles.scrollBtn + ' ' + poppins.className} scroll={false}>View Work</Link>

          <div className={styles.blob}>
            {/* This blob code is taken from https://codepen.io/notwaldorf/pen/omXwzw*/}
            {/* This SVG is from https://codepen.io/Ali_Farooq_/pen/gKOJqx */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
              <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
            </svg>
          </div>
        </section>

        <section className={styles.container} id="work-grid">
          <div className={styles.grid}>
            probably Yashv was too busy and he forgot to add his projects here...
          </div>
        </section>

      </main>

      <Contact />
      <Floating />
      <Footer />
    </>
  )
}
