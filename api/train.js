export default async function handler(req, res) {
  try {
    const { date, trainNo } = req.query;

    const url = `https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status?departure_date=${date}&isH5=true&client=web&deviceIdentifier=Mozilla%2520Firefox-138.0.0.0&train_number=${trainNo}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.TRAIN_API_KEY,
        'x-rapidapi-host': 'indian-railway-irctc.p.rapidapi.com'
      }
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}