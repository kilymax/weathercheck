import { WeatherApiResponse } from '@/types/weather-api'

export async function getWeather(lat: number, lon: number) {
	const config = useRuntimeConfig()
	const weatherApi = $fetch.create({
		baseURL: 'https://api.openweathermap.org/data/2.5/',
		onRequest({ options }) {
			options.query = {
				...options.query,
				appid: config.private.openWeatherApiKey,
				units: 'metric',
				exclude: 'current',
			}
		},
	})

	const weatherResponse: WeatherApiResponse = await weatherApi('weather', {
		query: { lat, lon },
	})
	const date = new Date(weatherResponse.sys.sunset * 1000)
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	return {
		temp: weatherResponse.main.temp,
		weather: weatherResponse.weather[0].main,
		pressure: weatherResponse.main.pressure,
		sunset: `${hours}:${minutes}`,
	}
}
