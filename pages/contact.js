import styles from '@/styles/Contact.module.css'
import { Poppins } from 'next/font/google'
import { useState } from 'react'

const poppins = Poppins({ weight: ['400', '500'], style: ['normal'], subsets: ['latin'] })

export default function Contact() {

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBtn("Sending...")

    try {
      const data = {
        name: e.target.name.value,
        email: e.target.mail.value,
        message: e.target.message.value,
      }

      console.log(data);

      const JSONdata = JSON.stringify(data)
      const endpoint = '/api/email'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }

      const response = await fetch(endpoint, options)
      const result = await response.json()

      console.log(result);

      if (result.success) {
        setBtn("Sent!")
      } else {
        setBtn("Failed :(")
      }

    } catch (err) {
      
      console.error(err);
      setBtn("Failed :(")

    } finally {
      
      setTimeout(() => {
        setBtn("Submit")
      }, 5000);

    }
  }


  const [submitBtn, setBtn] = useState('Submit');

  const mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return (
    <>
      <section className={styles.container} id="contact">
        <div className={styles.contactme + ' ' + poppins.className}>
          <h3 className={styles.heading + ' ' + poppins.className}>
            Want&nbsp;to get&nbsp;in touch?
          </h3>

          <form className={styles.form} method='post' action='/api/email' onSubmit={handleSubmit}>
            <div className={styles.userdetails}>
              <div className={styles.details}>
                <label className={styles.label + ' ' + poppins.className} htmlFor="Name">Name</label>
                <input className={styles.input + ' ' + poppins.className} type="text" name="name" placeholder="Enter your name" id="Name" required />
              </div>
              <div className={styles.details}>
                <label className={styles.label + ' ' + poppins.className} htmlFor="Email">Email</label>
                <input
                  className={styles.input + ' ' + poppins.className}
                  id="Email"
                  type="email" name="mail"
                  placeholder="Enter your email"
                  pattern={mailRegex}
                  title="Invalid email address!"
                  required
                />
              </div>
            </div>
            <div className={styles.textwrapper}>
              <label className={styles.label + ' ' + poppins.className} htmlFor="Message">Message</label>
              <textarea className={styles.textarea + ' ' + poppins.className} name="message" placeholder='Enter your message' id="Message"></textarea>
              <input className={styles.submit + ' ' + poppins.className} type="submit" value={submitBtn} data-wait="Sending..." data-success="Sent!" data-failure="Failed :(" />
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
