import verify from "jsonwebtoken/verify" 
import nodemailer from "nodemailer"
import { template } from "./templates/template"

export default function handler(req, res) {
  try {
    const date = new Date();
    const stamp = date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    const { body, url, method, geo, ip, headers } = req
    console.log({ url, ip, geo, method, headers, body, timestamp: stamp }) // logging
  } catch (err) {
    console.error('Some error occured in Middleware:', err)
  }

  if (req.method === "POST") {
    const { name, email, message, petname, response, captcha, answer } = req.body;

    if (response || petname) { // honeypots filled by spam bots
      console.warn('BOT DETECTED! REASON: HONEYPOTS FILLED.')
      return res.status(418).json({ success: false, data: "Cannot handle!" })
    }

    return new Promise((resolve, reject) => {
      verify(answer, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          console.error(err);
          if (err.name === 'TokenExpiredError') {
            res.status(200).json({ success: false, data: "Captcha expired!" })
          } else {
            res.status(200).json({ success: false, data: "Captcha verification failed!" })
          }
          resolve()
        }
        else if (captcha === decoded.token) {
          try {
            const transporter = nodemailer.createTransport({
              host: process.env.MAIL_SMTP,
              port: process.env.MAIL_PORT,
              secure: false,
              auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
              },
            })

            const info = await transporter.sendMail({
              from: `"${process.env.MAIL_USERNAME}" <${process.env.MAIL_USER}>`,
              to: process.env.MAIL_TO,
              cc: process.env.MAIL_CC,
              subject: `${name}'s message received!`,
              text: `${name} <${email}> said: ${message}`,
              html: template(name, email, message),
              disableFileAccess: true,
            })

            console.log('SMTP response:', info)
            res.status(200).json({ success: true, data: "Thank you for your message, I will get back to you soon!" })
            resolve()
          } catch (err) {
            console.error(err)
            res.status(200).json({ success: false, data: "Some error occured!" })
            resolve()
          }
        }
      })
    })
  } else {
    return res.status(405).json({ success: false, data: "Wrong HTTP method!" })
  }
}
