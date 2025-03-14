import { useLocalStorage } from '@vueuse/core'

export const useFavorites = () => {
	const favorites = useLocalStorage<string[]>('favorites', [])
	const isFavorite = (city: string) => favorites.value.includes(city)

	const addFavorite = (city: string) => {
		if (!favorites.value.includes(city)) {
			favorites.value.push(city)
		}
	}

	const removeFavorite = (city: string) => {
		favorites.value = favorites.value.filter((item) => item !== city)
	}

	const fetchWeatherForFavorites = async () => {
		const weatherData = await Promise.all(
			favorites.value.map(async (city) => {
				const { weather } = await $fetch(`/api/fetchWeatherData?city=${city}`)
				return { city, weather: weather }
			})
		)
		return weatherData
	}

	return {
		favorites,
		addFavorite,
		removeFavorite,
		fetchWeatherForFavorites,
		isFavorite,
	}
}
