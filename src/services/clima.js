const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeather(lat, lon, city = null) {
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('Chave da API não configurada. Defina REACT_APP_OPENWEATHER_API_KEY no arquivo .env.');
  }

  const location = city
    ? `q=${encodeURIComponent(city)}`
    : `lat=${lat}&lon=${lon}`;
  const url = `${API_URL}?${location}&appid=${apiKey}&units=metric&lang=pt`;

  const response = await fetch(url);
  if (response.status === 404) {
    throw new Error('Cidade não encontrada. Confira o nome e tente novamente.');
  }
  if (!response.ok) {
    throw new Error('Não foi possível buscar os dados do clima. Tente novamente em instantes.');
  }
  return response.json();
}
