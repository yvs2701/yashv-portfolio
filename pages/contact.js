import styles from '@/styles/Contact.module.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['400', '500'], style: ['normal'], subsets: ['latin'] })

export default function Contact() {
  return (
    <>
      <section className={styles.container} id="contact">
        <div className={styles.contactme + ' ' + poppins.className}>
          <h3 className={styles.heading + ' ' + poppins.className}>
            Want&nbsp;to get&nbsp;in touch?
          </h3>
          <form className={styles.form}>
            <div className={styles.userdetails}>
              <div className={styles.details}>
                <label className={styles.label + ' ' + poppins.className} htmlFor="Name">Name</label>
                <input className={styles.input + ' ' + poppins.className} type="text" name="Name" data-name="Name" placeholder="Enter your name" id="Name" required />
              </div>
              <div className={styles.details}>
                <label className={styles.label + ' ' + poppins.className} htmlFor="Email">Email</label>
                <input className={styles.input + ' ' + poppins.className} type="email" name="Email" data-name="Email" placeholder="Enter your email" id="Email" required />
              </div>
            </div>
            <div className={styles.textwrapper}>
              <label className={styles.label + ' ' + poppins.className} htmlFor="Message">Message</label>
              <textarea className={styles.textarea + ' ' + poppins.className} name="Message" placeholder='Enter your message' id="Message"></textarea>
              <input className={styles.submit + ' ' + poppins.className} type="submit" value="Submit" data-wait="Please wait..." />
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
