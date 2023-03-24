export default function handler(req, res) {
    const body = req.body
    try {
        const date = new Date();
        const stamp = date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

        console.log({ request: body, timestamp: stamp }) // logging
    } catch(err) {
        return res.status(500).json({ success: false, data: "Some error occured!" })
    }

    if (req.method === "POST") {

        return res.status(200).json({ success: true, data: body })

    } else {
        return res.status(405).json({ success: false, data: "Wrong HTTP method!" })
    }
}
