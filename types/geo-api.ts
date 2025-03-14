export interface GeoApiResponseItem {
	name: string
	local_names: Record<string, string>
	lat: number
	lon: number
	country: string
	state?: string
	state_code?: string
	id: number
}

export type GeoApiResponse = GeoApiResponseItem[]
