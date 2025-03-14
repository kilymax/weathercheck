export default defineEventHandler(async (event) => {
	const { city } = getQuery(event) as { city: string }

	if (!city) {
		throw createError({ statusCode: 400, statusMessage: 'Город не указан' })
	}

	const { lat, lon } = await getCoords(city)

	const weatherData = await getWeather(lat, lon)

	return {
		city,
		lat,
		lon,
		weather: weatherData,
	}
})
