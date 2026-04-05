import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Poppins } from 'next/font/google'
import { Crimson_Pro } from 'next/font/google'
import userimg from '../public/Yashv-checked-shirt.jpeg'

const poppins = Poppins({ weight: ['300', '400'], style: ['normal'], subsets: ['latin'], display: 'swap' })
const crimpro = Crimson_Pro({ weight: ['300'], style: ['normal'], subsets: ['latin'], display: 'swap' })

function SkillsList({ skills }) {
  if (!Array.isArray(skills)) return (<></>)

  return (
    <>
      <ul className={styles.skills}>
        {skills.map((skill, index) => <li key={index}> {skill} </li>)}
      </ul>
    </>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Yashvardhan Singh</title>
        <meta name="description" content="Yashvardhan Singh's portfolio" />
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
            loading="lazy"
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
              Always up for a challenge, I&nbsp;have juggled a lot of programming languages and experienced a wide variety of domains ranging from ML to Web and App development. As&nbsp;a sophomore I&nbsp;interned at Kavya&nbsp;Softech pvt.&nbsp;ltd. as a React developer and later trained as a Salesforce CRM developer at PricewaterhouseCoopers (PwC).
            </p>
            <SkillsList skills={['React', 'Express', 'Flask', 'PyTorch', 'Core Java', 'Python', 'C++', 'MySQL', 'MongoDB', 'Typescript', 'Salesforce']} />

          </div>
          <div className={styles.career}>
            <p className={styles.history}>
              After graduation, I&nbsp;joined Accenture as an Advanced&nbsp;App Engineering Analyst. My first engagement was with Edward&nbsp;Jones on trade related services and compliance review applications used by their financial advisors. My work spanned the full stack &mdash; from batch processing and backend REST&nbsp;services to frontend experiences &mdash; along with end&#8209;to&#8209;end deployments across containerized environments. I also introduced agentic AI innovations for the firm including ServiceNow change management automation and AI&#8209;assisted business reports generation.
            </p>
            <SkillsList skills={['Spring', 'Apache Struts', 'Docker', 'Kubernetes', 'Kafka', 'Jenkins', 'React.js', 'IBM DB2', 'AutoSys', 'Spark', 'Jmeter']} />
          </div>

        </div>
      </section>
    </>
  )
}
