import jwt from "jsonwebtoken"

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
    const { name, email, message, captcha, answer } = req.body;
    jwt.verify(answer, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error(err);
        if (err.name === 'TokenExpiredError') {
          return res.status(200).json({ success: false, data: "Captcha expired!" })
        } else {
          return res.status(200).json({ success: false, data: "Captcha verification failed!" })
        }
      }
      else if (captcha === decoded.token) {
        // do processing here

        return res.status(200).json({ success: true, data: "Thank you for your message, I will get back to you soon!" })
      }
    });
  } else {
    return res.status(405).json({ success: false, data: "Wrong HTTP method!" })
  }
}
