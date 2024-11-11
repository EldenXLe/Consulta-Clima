import { useEffect, useState } from 'react';
import useGeolocation from './hooks/useGeolocation';
import { fetchWeather } from './services/clima';
import { ThermometerIcon, CityIcon, CloudIcon } from './components/icones';

function App() {
  const { location, error } = useGeolocation();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [searchedWeather, setSearchedWeather] = useState(null);
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    if (location) {
      fetchWeather(location.lat, location.lon)
        .then(setCurrentWeather)
        .catch(console.error);
    }
  }, [location]);

  useEffect(() => {
    if (searchCity) {
      fetchWeather(null, null, searchCity)
        .then(setSearchedWeather)
        .catch(console.error);
    }
  }, [searchCity]);

  const handleSearch = () => {
    if (city) {
      setSearchCity(city);
    }
  };

  return (
    <div className=' bg-gradient-to-r from-cyan-500 to-blue-900 h-screen p-4 md:p-0'>
      <div className='w-full md:w-[350px] rounded-r-lg shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-r-2 border-r-black border-b-2 border-b-black p-4'>
        <h1 className='font-bold text-[18px] mb-2'>Clima da Localização Atual:</h1>
        {error && <p>Erro: {error}</p>}
        {currentWeather ? (
          <div>
            <p><CityIcon />Cidade: {currentWeather.name}</p>
            <p><ThermometerIcon />Temperatura: {currentWeather.main.temp}°C</p>
            <p><CloudIcon />{currentWeather.weather[0].description}</p>
          </div>
        ) : (
          <p>Obtendo clima da localização...</p>
        )}
      </div>

      <div className='md:ml-[500px] md:w-[350px] mt-[80px] p-4 md:mt-[50px] rounded-lg shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white  border-2 border-black  flex flex-col items-center'>
        <h2 className='font-bold text-[20px] pb-1'>Pesquise uma cidade</h2>
        <div className='mt-4 mb-4 flex flex-col gap-2 items-center'>
          <input className='text-black p-[5px] rounded-lg'
            type="text"
            placeholder="Digite o nome da cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className=' w-[100px] bg-cyan-500 hover:bg-cyan-600 text-white font-bold p-[5px] rounded' onClick={handleSearch}>Pesquisar</button>
        </div>
        {searchedWeather ? (
          <div className='text-center'>
            <h2 className='font-bold text-[18px] mb-2'>Clima da Cidade Pesquisada:</h2>
            <p className='mb-2'><CityIcon />Cidade: {searchedWeather.name}</p>
            <p className='mb-2'><ThermometerIcon />Temperatura: {searchedWeather.main.temp}°C</p>
            <p className='mb-2'><CloudIcon />{searchedWeather.weather[0].description}</p>
          </div>
        ) : searchCity ? (
          <p>Carregando clima da cidade pesquisada...</p>
        ) : (
          <p>Digite o nome de uma cidade para pesquisar o clima.</p>
        )}
      </div>
    </div>
  );
}

export default App;
