
export async function fetchWeather(lat, lon, city = null) {
  const apiKey = '362a4aa0ea2bf9177008822283e9828b'; 
  let url;

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erro ao buscar dados do clima');
  }
  const data = await response.json();
  return data;
}
