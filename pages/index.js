import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Poppins } from 'next/font/google'
import { Crimson_Pro } from 'next/font/google'
import userimg from '../public/Yashv-portrait-min.jpeg'

const poppins = Poppins({ weight: ['300', '400'], style: ['normal'], subsets: ['latin'], display: 'swap' })
const crimpro = Crimson_Pro({ weight: ['300'], style: ['normal'], subsets: ['latin'], display: 'swap' })
const skills = ['Javascript', 'React.js', 'Express.js', 'MongoDB', 'MySQL', 'HTML', 'CSS', 'Core Java', 'Spring', 'Python', 'Next.js', 'Typescript', 'Git', 'Docker']

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

      <main className={styles.container}>
        <section className={styles.main}>
          <Image
            src={userimg}
            width={400}
            alt="Yashvardan Singh"
            placeholder="blur"
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
              Always up for a challenge, I&nbsp;have juggled a lot of programming languages and experienced a wide variety of domains ranging from ML to Web and App development. As a sophomore I&nbsp;started working as trainee and intern at Kavya Softech pvt. ltd. under the supervision of a mentor and completed the allotted industry work revolving around React and MERN stack.
              <br />
              <br />
              Later as a senior in my undergraduates, I&nbsp;was&nbsp;a Salesforce trainee at PricewaterhouseCoopers (PwC) and got to know about the admin functionalities of the tool. In the same year I&nbsp;bagged a placement offer at Accenture as an AEH developer.
            </p>

            <ul className={styles.skills}>{skills.map((skill, index) => <li key={index}> {skill} </li>)} </ul>

          </div>

        </div>
      </section>
    </>
  )
}
