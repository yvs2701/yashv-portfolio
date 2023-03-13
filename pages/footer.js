import Image from 'next/image'
import styles from '@/styles/Footer.module.css'
import namelogo from '../public/YVicon.png'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['500'], style: ['normal', 'italic'], subsets: ['latin'] })

export default function Footer() {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.footer}>
          <div className="namebrand">
            <a
              className={styles.logo + ' ' + poppins.className}
              href="/"
            >
              <Image
                src={namelogo}
                alt="Name logo of Yashvardhan Singh"
                height={30}
                width={58}
              />
            </a>
          </div>

          <div className="links">
            <a href="https://www.linkedin.com/in/yashv27/" className={styles.link + ' ' + poppins.className}>LinkedIn</a>
            <a href="/" className={styles.link + ' ' + poppins.className}>About</a>
            <a href="/projects" className={styles.link + ' ' + poppins.className}>Projects</a>
          </div>
        </div>
        <div className={styles.copyright + ' ' + poppins.className}>
          Made with &hearts; by Yashvardhan Singh
        </div>
      </section>
    </>
  )
}
