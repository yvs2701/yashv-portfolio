import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Floating.module.css'
import github from '../public/icons/github-iconmonstr.png'
import linkedin from '../public/icons/linkedin-iconsdb.png'
import { useState, useEffect, useCallback } from 'react'

export default function Floating() {

  const [display, setDisplay] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, []);

  useEffect(() => {
    // only render this component if width is above 768px
    const width = "768"; // css width breakpoint
    const media = window.matchMedia(`(min-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setDisplay(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, [])


  return (
    <>{
      display &&
      <span className={styles.floatinglinks}>
        <Link className={styles.floatinglink} href='https://github.com/yvs2701'>
          <Image
            src={github}
            width={36}
            height={36}
            alt="github profile"
            placeholder="blur"
          />
        </Link>
        <Link className={styles.floatinglink} href='https://www.linkedin.com/in/yashv27/'>
          <Image
            src={linkedin}
            width={48}
            height={48}
            alt="linkedin profile"
            placeholder="blur"
          />
        </Link>
      </span>
    }</>
  )
}
