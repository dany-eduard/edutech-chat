export default async function handler(req, res) {
  if (req.method === 'POST') {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    })

    const data = await response.json()
    if (response.status !== 200) {
      return res.status(201).json({ message: data.message })
    }
    return res.status(200).json({ accessToken: data.accessToken, message: 'ok' })
  }
}
