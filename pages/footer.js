import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Footer.module.css'
import namelogo from '../public/YVicon.png'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['500'], style: ['normal', 'italic'], subsets: ['latin'], display: 'swap' })

export default function Footer() {
  const links = [
    {
      name: 'LinkedIn', url: 'https://www.linkedin.com/in/yashv27/'
    }, {
      name: 'LeetCode', url: 'https://leetcode.com/yvs2701/'
    }, {
      name: 'Github', url: 'https://github.com/yvs2701'
    }, {
      name: 'About', url: '/'
    }, {
      name: 'Projects', url: '/projects'
    }
  ];
  return (
    <>
      <section className={styles.container}>
        <div className={styles.footer}>
          <div className={styles.namebrand}>
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

          <div className={styles.links}>
            {
              links.map((link, idx) => <Link key={idx} href={link.url} className={styles.link + ' ' + poppins.className}>{link.name}</Link>)
            }
          </div>
        </div>
        <div className={styles.copyright + ' ' + poppins.className}>
          Made with &hearts; by Yashvardhan Singh
        </div>
      </section>
    </>
  )
}
