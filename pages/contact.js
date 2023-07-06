import styles from '@/styles/Contact.module.css'
import { Poppins } from 'next/font/google'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const poppins = Poppins({ weight: ['400', '500'], style: ['normal'], subsets: ['latin'], display: 'swap' })

export default function Contact() {
  const [captchaSrc, setCaptcha] = useState('')
  const [answer, setAnswer] = useState('')
  const [submitBtn, setBtn] = useState('Submit')
  const [disabled, setDisabled] = useState(true)
  const [_, setTimer] = useState(null)
  const [loading, setLoading] = useState(false)

  const getCaptcha = async () => {
    const endpoint = '/api/captcha'

    try {
      setLoading(prev => !prev)
      const response = await fetch(endpoint)
      const result = await response.json()

      if (result.success) {
        setCaptcha(result.captcha)
        setAnswer(result.answer)
      } else {
        setCaptcha('')
        setAnswer('')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(prev => !prev)
    }
  }

  useEffect(() => {

    getCaptcha()
    setTimer(setInterval(getCaptcha, 120000))

    return () => {
      setTimer(prev => {
        clearInterval(prev)
        return null
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDisabled(prev => {
      setBtn("Sending...")
      return true // disable the button
    })

    try {
      const data = {
        name: e.target.name.value,
        email: e.target.mail.value,
        message: e.target.message.value,
        captcha: e.target.captchaIn.value,
        answer: answer,

        response: e.target.response.value,
        petname: e.target.petname.value,
      }

      const JSONdata = JSON.stringify(data)
      const endpoint = '/api/email'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }

      setTimer((prev) => {
        clearTimeout(prev)
        getCaptcha()
        return setInterval(getCaptcha, 120000)
      })

      const response = await fetch(endpoint, options)
      const result = await response.json()

      console.log(result);

      if (result.success) {
        e.target.name.value = e.target.mail.value = e.target.message.value = e.target.captchaIn.value = ''
        setBtn("Sent!")
      } else {
        setBtn("Failed :(")
      }

    } catch (err) {

      console.error(err);
      setBtn("Failed :(")

    } finally {
      setDisabled(prev => {

        setTimeout(() => {
          setBtn("Submit")
        }, 5000);

        return true // disable the button
      })
    }
  }

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

                <input className={styles.input + ' ' + styles.input_honey + ' ' + poppins.className} type="text" name="petname" placeholder='Enter your pet name' id="PetName" />

              </div>
              <div className={styles.details}>
                <label className={styles.label + ' ' + poppins.className} htmlFor="Email">Email</label>
                <input
                  className={styles.input + ' ' + poppins.className}
                  id="Email"
                  type="email" name="mail"
                  placeholder="Enter your email"
                  title="address@email.com"
                  required
                />

                <input className={styles.input + ' ' + styles.input_honey + ' ' + poppins.className} type="text" name="response" placeholder='Enter your answer' id="Answer" />

              </div>
            </div>
            <div className={styles.textwrapper}>
              <label className={styles.label + ' ' + poppins.className} htmlFor="Message">Message</label>
              <textarea className={styles.textarea + ' ' + poppins.className} name="message" placeholder='Enter your message' id="Message"></textarea>

              {/* CAPTCHA */}
              {captchaSrc &&
                <div className={styles.captchaWrapper}>

                  <Image unoptimized src={captchaSrc} alt='Captcha Image' width={150} height={50} />

                  <div className={styles.inputGrp}>
                    <input className={styles.input + ' ' + poppins.className} name="captchaIn"
                      placeholder='Solve this Maths puzzle'
                      onChange={(e) => {
                        setDisabled(e.target.value === '')
                      }}
                    />

                    <button className={styles.reloadCaptcha + (loading ? ' ' + styles.loading : '')}
                      disabled={loading}
                      onClick={(e) => {
                        e.preventDefault()
                        setTimer((prev) => {
                          clearTimeout(prev)
                          getCaptcha()
                          return setInterval(getCaptcha, 120000)
                        })
                      }}>
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 330.006 330.006">
                        <g id="SVGRepo_iconCarrier"><g>
                          <path d="M304.302,209.419c-7.594-3.318-16.435,0.148-19.751,7.739c-20.766,47.527-67.69,78.236-119.546,78.236 c-41.106,0-79.108-19.32-103.445-51.003l51.23,10.19c8.126,1.617,16.021-3.661,17.638-11.786 c1.616-8.125-3.661-16.022-11.786-17.638l-84.004-16.709c-8.125-1.612-16.021,3.661-17.638,11.786L0.291,304.238 c-1.616,8.125,3.661,16.022,11.786,17.638c0.988,0.196,1.972,0.291,2.942,0.291c7.01,0,13.276-4.94,14.696-12.077l9.148-45.992 c29.972,38.123,76.202,61.296,126.142,61.296c63.78,0,121.496-37.77,147.036-96.225 C315.358,221.579,311.893,212.736,304.302,209.419z"></path>
                          <path d="M317.929,8.12c-8.125-1.614-16.022,3.661-17.638,11.786l-9.149,45.997C261.169,27.783,214.94,4.611,165.005,4.611 c-63.779,0-121.495,37.771-147.038,96.224c-3.317,7.591,0.148,16.434,7.739,19.751c1.956,0.854,3.993,1.259,5.999,1.259 c5.781,0,11.29-3.362,13.753-8.998c20.768-47.527,67.693-78.237,119.548-78.237c41.099,0,79.1,19.316,103.437,50.995 l-51.228-10.191c-8.127-1.615-16.022,3.66-17.639,11.785c-1.616,8.125,3.66,16.022,11.785,17.639l84.006,16.711 c0.971,0.193,1.951,0.288,2.927,0.288c2.945,0,5.849-0.868,8.333-2.528c3.308-2.21,5.602-5.644,6.378-9.546l16.709-84.006 C331.331,17.633,326.054,9.736,317.929,8.12z"></path>
                        </g></g>
                      </svg>
                    </button>

                  </div>
                </div>
              }
              <input className={styles.submit + ' ' + poppins.className} type="submit" value={submitBtn} disabled={disabled} />
            </div>


          </form>
        </div>
      </section>
    </>
  )
}
