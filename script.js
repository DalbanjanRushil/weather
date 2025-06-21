async function getWeather() {
  const location = document.getElementById("locationInput").value;
  const resultDiv = document.getElementById("result");

  if (!location) {
    resultDiv.innerHTML = "❗ Please enter a city.";
    return;
  }

  resultDiv.innerHTML = "⏳ Fetching weather...";

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=7e5d50fa8cff422789150456252006&q=${location}&aqi=yes`
    );

    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = "❌ City not found. Try another one.";
      return;
    }

    const emoji = getWeatherEmoji(data.current.condition.text);

    resultDiv.innerHTML = `
      <p><strong>${emoji} ${data.location.name}, ${data.location.country}</strong></p>
      <p>🌡 <strong>${data.current.temp_c}°C</strong></p>
      <p>${data.current.condition.text}</p>
      <img src="${data.current.condition.icon}" alt="weather" style="margin-top:10px" />
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
    resultDiv.innerHTML = "⚠️ Couldn't fetch weather. Try again.";
  }
}

function getWeatherEmoji(condition) {
  const lower = condition.toLowerCase();
  if (lower.includes("sunny")) return "☀️";
  if (lower.includes("cloud")) return "☁️";
  if (lower.includes("rain")) return "🌧️";
  if (lower.includes("snow")) return "❄️";
  if (lower.includes("fog") || lower.includes("mist")) return "🌫️";
  return "🌡️";
}
