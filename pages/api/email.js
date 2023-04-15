import jwt from "jsonwebtoken"
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
      jwt.verify(answer, process.env.JWT_SECRET, async (err, decoded) => {
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
              to: process.env.MAIL_USER,
              replyTo: process.env.MAIL_USER,
              subject: `${name}'s message received!`,
              text: `${name} <${email}> said: ${message}`,
              html: `
                  <tbody>
                  <tr>
                    <td class="drow" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;" valign="top" align="center">
                      <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                        <table class="edcontent" style="border-collapse: collapse;width:100%" cellspacing="0" border="0">
                          <tbody>
                            <tr>
                              <td class="edtext" style="padding: 10px 20px; text-align: left; color: #5f5f5f; font-size: 16px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;" valign="top">
                                <p class="style1 text-center" style="text-align: center; margin: 0px; padding: 0px; color: #000000; font-size: 32px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">Message received!</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="drow" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;" valign="top" align="center">
                      <div class="layer_2" style="display: inline-block; vertical-align: top; width: 100%; max-width: 600px;">
                        <table class="edcontent" style="border-collapse: collapse;width:100%" cellspacing="0" border="0">
                          <tbody>
                            <tr>
                              <td class="edtext" style="padding: 10px 20px; text-align: left; color: #5f5f5f; font-size: 16px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;" valign="top">
                                <p class="style2" style="margin: 0px; padding: 0px; color: #000000; font-size: 22px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;"><strong>Name:</strong></p>
                                <p style="margin: 0px; padding: 0px;">${name}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="drow" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;" valign="top" align="center">
                      <div class="layer_2" style="display: inline-block; vertical-align: top; width: 100%; max-width: 600px;">
                        <table class="edcontent" style="border-collapse: collapse;width:100%" cellspacing="0" border="0">
                          <tbody>
                            <tr>
                              <td class="edtext" style="padding: 10px 20px; text-align: left; color: #5f5f5f; font-size: 16px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;" valign="top">
                                <p class="style2" style="margin: 0px; padding: 0px; color: #000000; font-size: 22px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;"><strong>Email:</strong></p>
                                <p style="margin: 0px; padding: 0px;">${email}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="drow" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;" valign="top" align="center">
                      <div class="layer_2" style="display: inline-block; vertical-align: top; width: 100%; max-width: 600px;">
                        <table class="edcontent" style="border-collapse: collapse;width:100%" cellspacing="0" border="0">
                          <tbody>
                            <tr>
                              <td class="edtext" style="padding: 10px 20px; text-align: left; color: #5f5f5f; font-size: 16px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;" valign="top">
                                <p class="style2" style="margin: 0px; padding: 0px; color: #000000; font-size: 22px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;"><strong>Message:</strong></p>
                                <pre style="margin: 0px; padding: 0px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">${message}</pre>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>`,
              disableFileAccess: true,
            })

            console.log(info)
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
