import Image from 'next/image'
import Link from 'next/link'
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
            <Link
              className={styles.logo + ' ' + poppins.className}
              href="/"
            >
              <Image
                src={namelogo}
                alt="Name logo of Yashvardhan Singh"
                height={30}
                width={58}
              />
            </Link>
          </div>

          <div className="links">
            <Link href="https://www.linkedin.com/in/yashv27/" className={styles.link + ' ' + poppins.className}>LinkedIn</Link>
            <Link href="https://github.com/yvs2701" className={styles.link + ' ' + poppins.className}>Github</Link>
            <Link href="/" className={styles.link + ' ' + poppins.className}>About</Link>
            <Link href="/projects" className={styles.link + ' ' + poppins.className}>Projects</Link>
          </div>
        </div>
        <div className={styles.copyright + ' ' + poppins.className}>
          Made with &hearts; by Yashvardhan Singh
        </div>
      </section>
    </>
  )
}
