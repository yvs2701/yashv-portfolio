import Image from 'next/image'
import styles from '@/styles/Navbar.module.css'
import namelogo from '../public/YVicon.png'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['500'], style: ['normal', 'italic'], subsets: ['latin'] })

export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar + ' ' + poppins.className}>
        <div className={styles.namebrand + ' ' + poppins.className}
        >
          <Image
            src={namelogo}
            alt="Name logo of Yashvardhan Singh"
            height={30}
            width={58}
          />
          <span className={styles.name + ' ' + poppins.className}>Yashvardhan Singh</span>
        </div>
        <div className={styles.navlinks}>
          <a href="/" className={styles.navlink + ' ' + poppins.className}>About</a>
          <a href="#contact" className={styles.navlink + ' ' + poppins.className}>Contact</a>
          <a href="/projects" className={styles.navlink + ' ' + poppins.className}>Projects</a>
        </div>
      </nav>
    </>
  )
}
