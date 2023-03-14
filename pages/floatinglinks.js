import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Floating.module.css'
import github from '../public/github-iconmonstr.png'
import linkedin from '../public/linkedin-iconsdb.png'

export default function Floating() {
  return (
    <>
      <span className={styles.floatinglinks}>
        <Link className={styles.floatinglink} href='https://github.com/yvs2701'>
          <Image
            src={github}
            width={36}
            height={36}
          />
        </Link>
        <Link className={styles.floatinglink} href='https://www.linkedin.com/in/yashv27/'>
          <Image
            src={linkedin}
            width={48}
            height={48}
          />
        </Link>
      </span>
    </>
  )
}
