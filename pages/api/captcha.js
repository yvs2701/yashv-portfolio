import jwt from 'jsonwebtoken'
import { createCanvas, GlobalFonts } from '@napi-rs/canvas'
import path from 'path'

const FONT_NAME = 'CaptchaFont' // custom font file, in case the production environment is lacking any fonts

GlobalFonts.registerFromPath(
  path.join(process.cwd(), 'public', 'fonts', 'DejaVuSans-webfont.woff'),
  FONT_NAME
)

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomOperator = () => {
  const type = getRandomInt(0, 1) // '+' or '-'
  return type === 0 ? '+' : '-' // 0 = '+' and 1 = '-'
}

const drawLines = (ctx, w, h, numOfLines = 25) => {
  for (var i = 0; i < numOfLines; i++) {
    ctx.beginPath()
    ctx.moveTo(getRandomInt(0, w), getRandomInt(0, h))
    ctx.lineTo(getRandomInt(0, w), getRandomInt(0, h))
    ctx.strokeStyle = "rgb(" + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + ")"
    ctx.stroke();
  }
}

const generateCaptchaImg = (
  text,
  defaultWidth = 300,
  defaultHeight = 100,
  defaultFontSize = 45,
  textColorLowvalue = 140,
  textColorHighvalue = 160) => {
  const canvas = createCanvas(defaultWidth, defaultHeight)
  const ctx = canvas.getContext('2d')

  /* CAPTCHA SIZE */
  canvas.width = defaultWidth
  canvas.height = defaultHeight

  /* CAPTCHA BACKGROUND */
  const imgData = ctx.createImageData(canvas.width, canvas.height)
  for (let i = 0; i < imgData.data.length; i++) {
    imgData.data[i] = getRandomInt(0, 255)
  }
  ctx.putImageData(imgData, 0, 0)

  /* CAPTCHA TEXT */
  ctx.fillStyle = "rgb(" + getRandomInt(textColorLowvalue, textColorHighvalue) + "," + getRandomInt(textColorLowvalue, textColorHighvalue) + "," + getRandomInt(textColorLowvalue, textColorHighvalue) + ")"
  ctx.font = defaultFontSize + "px " + FONT_NAME
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  /* MORE IMAGE DISTORTIONS */
  drawLines(ctx, canvas.width, canvas.height)

  return canvas.toDataURL();
}


export default function handler(req, res) {

  try {
    const date = new Date();
    const stamp = date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    const { body, url, method, geo, ip, headers } = req
    console.log({ url, ip, geo, method, headers, body, timestamp: stamp }) // logging
  } catch (err) {
    console.error('Some error occured in Middleware:', err)
  }

  if (req.method === "GET") {

    try {
      const firstInt = getRandomInt(15, 100)
      const eqn = firstInt + ' ' + getRandomOperator() + ' ' + getRandomInt(0, firstInt)
      const token = jwt.sign({ token: String(eval(eqn)) }, process.env.JWT_SECRET, { expiresIn: '2m' })

      return res.status(200).json({ success: true, captcha: generateCaptchaImg(eqn), answer: token })

    } catch (err) {

      console.error(err)
      return res.status(500).json({ success: false, data: "Some error occured!" })

    }

  } else {
    return res.status(405).json({ success: false, data: "Wrong HTTP method!" })
  }
}
