import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Navbar.module.css'
import namelogo from '../public/YVicon.png'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['500'], style: ['normal', 'italic'], subsets: ['latin'] })

export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar + ' ' + poppins.className}>
        <Link
          className={styles.namebrand + ' ' + poppins.className}
          href="/"
        >
          <Image
            src={namelogo}
            alt="Name logo of Yashvardhan Singh"
            height={30}
            width={58}
          />
          <span className={styles.name + ' ' + poppins.className}>Yashvardhan Singh</span>
        </Link>
        <div className={styles.navlinks}>
          <Link href="/" className={styles.navlink + ' ' + poppins.className}>About</Link>
          <Link href="#contact" className={styles.navlink + ' ' + poppins.className} scroll={false}>Contact</Link>
          <Link href="/projects" className={styles.navlink + ' ' + poppins.className}>Projects</Link>
        </div>
      </nav>
    </>
  )
}
