export default async function handler(req, res) {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required." });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
    );

    const data = await response.json();

    if (data.error) {
      return res.status(404).json({ error: "City not found." });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Backend Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
