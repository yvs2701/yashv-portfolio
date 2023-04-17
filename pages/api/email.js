import verify from "jsonwebtoken/verify"
import nodemailer from "nodemailer"

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
        else if (captcha === decoded.token && typeof name === 'string' && typeof email === 'string' && typeof message === 'string') {
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
              replyTo: process.env.MAIL_USER,
              subject: `${name}'s message received!`,
              text: `${name} <${email}> said: ${message}`,
              html: `<head><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i &subset=cyrillic,latin-ext" data-name="open_sans" rel="stylesheet" type="text/css"></head><body style="padding:0;margin:0;background:#e4e6ec"><table style="height:100%;width:100%;background-color:#e4e6ec" align="center"><tbody><tr><td id="dbody" data-version="2.31" style="width:100%;height:100%;padding-top:50px;padding-bottom:50px;background-color:#e4e6ec" valign="top"><table style="max-width:600px;box-sizing:border-box;width:100%;margin:0 auto" cellspacing="0" cellpadding="0" border="0" align="center"><tbody><tr><td class="drow" style="background-color:#fff;box-sizing:border-box;font-size:0;text-align:center" valign="top" align="center"><div style="max-width:596px;display:inline-block;vertical-align:top;width:100%"><table class="edcontent" style="border-collapse:collapse;width:100%" cellspacing="0" border="0"><tbody><tr><td class="edtext" style="padding:10px 20px;text-align:left;color:#5f5f5f;font-size:12px;font-family:&quot;direction:ltr;box-sizing:border-box" valign="top"><p class="style1 text-center" style="text-align:center;margin:0;padding:0;color:#000;font-size:32px;font-family:&quot">Somebody wrote to you!</p></td></tr></tbody></table></div></td></tr><tr><td class="drow" style="background-color:#fff;box-sizing:border-box;font-size:0;text-align:center" valign="top" align="center"><div style="max-width:600px;display:inline-block;vertical-align:top;width:100%"><table class="edcontent" style="border-collapse:collapse;width:100%" cellspacing="0" border="0"><tbody><tr><td class="edtext" style="padding:10px 20px;text-align:left;color:#5f5f5f;font-size:12px;font-family:&quot;direction:ltr;box-sizing:border-box" valign="top"><p class="style2" style="margin:0;padding:0;color:#000;font-size:22px;font-family:&quot">Name:</p><p style="margin:0;padding:0;font-size:14px;font-family:&quot">${t_name}</p></td></tr></tbody></table></div></td></tr><tr><td class="drow" style="background-color:#fff;box-sizing:border-box;font-size:0;text-align:center" valign="top" align="center"><div style="max-width:600px;display:inline-block;vertical-align:top;width:100%"><table class="edcontent" style="border-collapse:collapse;width:100%" cellspacing="0" border="0"><tbody><tr><td class="edtext" style="padding:10px 20px;text-align:left;color:#5f5f5f;font-size:12px;font-family:&quot;direction:ltr;box-sizing:border-box" valign="top"><p class="style2" style="margin:0;padding:0;color:#000;font-size:22px;font-family:&quot">Email:</p><p style="margin:0;padding:0;font-size:14px;font-family:&quot">${t_email}</p></td></tr></tbody></table></div></td></tr><tr><td class="drow" style="background-color:#fff;box-sizing:border-box;font-size:0;text-align:center" valign="top" align="center"><div style="max-width:600px;display:inline-block;vertical-align:top;width:100%"><table class="edcontent" style="border-collapse:collapse;width:100%" cellspacing="0" border="0"><tbody><tr><td class="edtext" style="padding:10px 20px;text-align:left;color:#5f5f5f;font-size:12px;font-family:&quot;direction:ltr;box-sizing:border-box" valign="top"><p class="style2" style="margin:0;padding:0;color:#000;font-size:22px;font-family:&quot">Message:</p><pre style="margin:0;padding:0;font-size:14px;font-family:&quot">${t_message}</pre></td></tr></tbody></table></div></td></tr></tbody></table></td></tr></tbody></table></body>`,
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
        } else {
          return res.status(401).json({ success: false, data: "Unauthorised!" })
        }
      })
    })
  } else {
    return res.status(405).json({ success: false, data: "Wrong HTTP method!" })
  }
}
