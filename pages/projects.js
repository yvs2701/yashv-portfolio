import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import styles from '@/styles/Projects.module.css'
import insights from '../public/projects/insights.jpg'
import aanchal from '../public/projects/aanchal.png'
import funedu from '../public/projects/funedu.jpg'
import covinet from '../public/projects/covinet.jpg'
import covihelp from '../public/projects/covihelp.png'
import reacttodos from '../public/projects/reacttodos.png'
import weather from '../public/projects/weather.png'
import github from '../public/projects/github.jpg'
import fulcrum from '../public/projects/fulcrum_nightwing_11_22.jpg'
import crimeviz from '../public/projects/crimeviz.jpg'
import facemask from '../public/projects/face_mask.jpg'
import one_mile from '../public/projects/1-mile.png'
import colorschemes from '../public/projects/color_schemes.png'

const poppins = Poppins({ weight: ['300', '400', '500'], style: ['normal'], subsets: ['latin'], display: 'swap' })

const prjs = [
  {
    photo: colorschemes,
    link: 'https://github.com/yvs2701/ColorSchemes',
    title: 'ColorSchemes',
    description: 'SaaS app to extract colors from images and generate aesthetic themes.'
  },
  {
    photo: one_mile,
    link: 'https://github.com/yvs2701/1-mile-reboot',
    title: '1-mile - Gamified Chat',
    description: 'Gamifies simple chat messages. Makes you walk and make real connections. Gain “proximity” as you walk towards each other.'
  },
  {
    photo: insights,
    link: 'https://github.com/yvs2701/InsightsClubWebsite',
    title: 'Insights club - home page',
    description: 'Blogsite and homepage for insights club comprising video feeds and event updates.'
  },
  {
    photo: crimeviz,
    link: 'https://github.com/yvs2701/The-path-of-Coder/tree/main/Data%20Sci/Crime%20Viz%20India',
    title: 'CrimeViz - India',
    description: 'Maps and Time series charts depicting crimes occurring in India from 2000 to 2013.'
  },
  {
    photo: aanchal,
    link: 'https://github.com/yvs2701/Anchaal-app',
    title: 'Aanchal app - for women',
    description: 'The app alerts nearby people, and saved contacts during the time of an emergency.'
  },
  {
    photo: facemask,
    link: 'https://github.com/yvs2701/The-path-of-Coder/tree/main/Python/face-mask-detection',
    title: 'Face mask detection',
    description: 'SVM model to classify if the users are wearing a mask properly or not.'
  },
  {
    photo: fulcrum,
    link: 'https://github.com/yvs2701/Fulcrum-voice-assistant',
    title: 'Fulcrum - voice ai',
    description: 'Simple voice ai to greet you, search your queries, play songs, find people etc.'
  },

  {
    photo: covihelp,
    link: 'https://github.com/yvs2701/CoviHelp',
    title: 'CoviHelp - browser extension',
    description: 'Find your preferred vaccine slots nearby. Alerts you when slots become available.'
  },
  {
    photo: covinet,
    link: 'https://github.com/yvs2701/Covinet',
    title: 'Covinet - corona tracker',
    description: 'Social awareness for Covid pandemic and tracker for virus spread.'
  },
  {
    photo: weather,
    link: 'https://yvs2701.github.io/mlh-lhd-submissions/Weather-app/',
    title: 'Simple weather app',
    description: 'Fetches weather data from OpenWeatherMap api.'
  },
  {
    photo: reacttodos,
    link: 'https://yvs2701.github.io/React-Todos-List/',
    title: 'Todos list - react app',
    description: 'Manage your daily goals and todos using this browser synced web app.'
  },
  {
    photo: funedu,
    link: 'https://github.com/yvs2701/fun-edu',
    title: 'FunEdu - online Ed. repository',
    description: 'Learning materials curated for every age group.'
  },
  {
    photo: github,
    link: 'https://github.com/yvs2701?tab=repositories',
    title: 'More on GitHub',
    description: 'View more repositories and codes on GitHub'
  },
]

function PrjCard({ photo, title, description, link }) {
  return (
    <>
      <div className={styles.card}>
        <Image src={photo} alt={`cover image for project ${title}`} fill placeholder="blur" />
        <div className={styles.cardcontent}>

          <h3 className={styles.cardhead + ' ' + poppins.className}>{title}</h3>

          <div className={styles.cardtext}>
            {description && <p className={styles.cardbody + ' ' + poppins.className}>{description}</p>}
            {link && <Link href={link} className={styles.cardlink + ' ' + poppins.className} target='_blank' rel='noopener noreferrer'>Visit</Link>}
          </div>

        </div>
      </div>
    </>
  )
}

export default function Projects() {
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

      <main className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.slogan + ' ' + poppins.className}>
            A developer&nbsp;passionate about creating&nbsp;polished end&#8209;to&#8209;end products
            {/* &#8209; is the non-breaking hyphen ("-") character */}
          </h1>
          <h2 className={styles.subtitle + ' ' + poppins.className}>
            Vellore&nbsp;Institute of Technology graduate. Learning about Artificial&nbsp;Intelligence and Machine&nbsp;Learning. Web&nbsp;developer by heart.
          </h2>
          <Link href="#work-grid" className={styles.scrollBtn + ' ' + poppins.className} scroll={false}>View Work</Link>

          <div className={styles.blob}>
            {/* This blob animation is taken from https://codepen.io/notwaldorf/pen/omXwzw*/}
            {/* This SVG is from https://codepen.io/Ali_Farooq_/pen/gKOJqx */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
              <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
            </svg>
          </div>
        </section>

        <section className={styles.container} id="work-grid">
          <div className={styles.grid}>
            {
              prjs.map((prj, idx) => <PrjCard key={idx} photo={prj.photo} title={prj.title} description={prj.description} link={prj.link} />)
            }
          </div>
        </section>

      </main>
    </>
  )
}
