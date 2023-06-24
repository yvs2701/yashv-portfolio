import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Poppins } from 'next/font/google'
import { Crimson_Pro } from 'next/font/google'
import Navbar from './navbar'
import Contact from './contact'
import Footer from './footer'
import userimg from '../public/Yashv-portrait-min.jpeg'
import Floating from './floatinglinks'

const poppins = Poppins({ weight: ['300', '400'], style: ['normal'], subsets: ['latin'],  display: 'swap' })
const crimpro = Crimson_Pro({ weight: ['300'], style: ['normal'], subsets: ['latin'],  display: 'swap' })
const skills = ['Javascript', 'React.js', 'Express.js', 'MongoDB', 'HTML/CSS', 'SQL', 'PostgreSQL', 'Core Java', 'Python', 'Git', 'Next.js', 'Tailwind css']

export default function Home() {
  return (
    <>
      <Head>
        <title>Yashvardhan Singh</title>
        <meta name="description" content="Portoflio for Yashvardhan Singh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Navbar />

      <main className={styles.container}>
        <section className={styles.main}>
          <Image
            src={userimg}
            width={400}
            alt="Yashvardan Singh"
          />

          <div className={styles.description}>
            <h1 className={styles.welcome + ' ' + poppins.className}> Hello <span className={'brandW ' + crimpro.className}>YV</span>orld!</h1>
            <p className={styles.aboutme + ' ' + poppins.className}>
              Fuelled by a passion for developing polished products, I&nbsp;have a deep desire to excel and continuously improve in my work.
              Learn more about my journey below.
            </p>
          </div>

        </section>
      </main>

      <section className={styles.container}>
        <div className={styles.trackrecord + ' ' + poppins.className}>
          <h2 className={styles.heading}> Career record </h2>

          <div className={styles.career}>
            <p className={styles.history}>
              Always up for a challenge, I&nbsp;have juggled a lot of programming languages and exprerienced a wide variety of domains ranging from ML
              to Web and App development. I&nbsp;have worked for Insights-club @VIT, and developed a Blogsite cum Homepage along with managing a team of four.
              <br />
              <br />
              I&nbsp;have also been a part time trainee at Kavya Softech pvt. ltd. where I worked as a MERN stack developer, under the supervision of a mentor and completed
              the alloted industry work.
            </p>

            <ul className={styles.skills}>{skills.map((skill, index) => <li key={index}> {skill} </li>)} </ul>

          </div>

        </div>
      </section>

      <Contact />
      <Floating />
      <Footer />
    </>
  )
}
