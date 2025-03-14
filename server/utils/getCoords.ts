import { GeoApiResponse } from '@/types/geo-api'
const config = useRuntimeConfig()

export async function getCoords(city: string) {
	const geoApi = $fetch.create({
		baseURL: 'http://api.openweathermap.org/geo/1.0/',
		onRequest({ options }) {
			options.query = {
				...options.query,
				appid: config.private.openWeatherApiKey,
				limit: 1,
				q: city,
			}
		},
	})

	const geoResponse: GeoApiResponse = await geoApi('direct')

	if (!geoResponse.length) {
		throw createError({ statusCode: 404, statusMessage: 'Город не найден' })
	}
	return {
		lat: geoResponse[0].lat,
		lon: geoResponse[0].lon,
	}
}
