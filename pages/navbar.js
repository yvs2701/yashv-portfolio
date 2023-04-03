import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from '@/styles/Navbar.module.css'
import namelogo from '../public/YVicon.png'
import menulogo from '../public/icons/menuIcon.png'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['500'], style: ['normal', 'italic'], subsets: ['latin'] })

export default function Navbar() {

  const [closedMenu, setClosedMenu] = useState(true);

  return (
    <>
      <nav className={styles.navbar + ' ' + poppins.className + ' ' + (closedMenu ? '' : styles.closed)}>
        <div className={styles.navheader}>
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

          <button
            className={styles.burger}
            onClick={() => {
              setClosedMenu(prevState => !prevState);
            }}
          >
            <Image
              src={menulogo}
              alt="Hamburger menu"
              height={44}
              width={44}
            />
          </button>
        </div>

        <ul className={styles.navlinks + ' ' + (closedMenu ? styles.closed : '')}
          onClick={() => {
            setClosedMenu(true)
          }}
        >
          <li className={styles.navlink + ' ' + poppins.className}><Link href="/">About</Link></li>
          <li className={styles.navlink + ' ' + poppins.className}><Link href="#contact" scroll={false}>Contact</Link></li>
          <li className={styles.navlink + ' ' + poppins.className}><Link href="/projects">Projects</Link></li>
        </ul>
      </nav>
    </>
  )
}
