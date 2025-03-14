export default defineNuxtConfig({
	compatibilityDate: '2025-02-13',
	devtools: { enabled: true },
	modules: [
		'@vueuse/nuxt',
		'@formkit/auto-animate/nuxt',
		'nuxt-svgo',
		'@vite-pwa/nuxt',
	],
	runtimeConfig: {
		private: {
			openWeatherApiKey: process.env.NUXT_OPEN_WEATHER_API_KEY,
		},
	},
	svgo: {
		autoImportPath: './public/icons/',
		componentPrefix: 'svg',
	},
	css: ['~/assets/styles/main.scss'],
	app: {
		head: {
			link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icons/logo.svg' }],
			title: 'WeatherCheck',

			htmlAttrs: {
				lang: 'ru', 
		  	},
			meta: [
				{name: 'description', content: 'Узнавай погоду в любой точке мира в режиме реального времени.'},
				{name: 'keywords', content: 'weather, погода, temperature, температура, pressure, давление, sunset, закат'},
				{name: 'viewport', content: 'width=device-width, initial-scale=1'},
				{'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8'}
			],
		},
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "~/assets/styles/helpers" as *;`,
				},
			},
		},
	},
	sitemap: {
		hostname: 'https://test-9qvg.vercel.app/',
		routes: async () => {
			const citiesData = require('~/public/cities.json')
			const cityRoutes = citiesData.map(
				(city: any) => `/city?city=${encodeURIComponent(city.ru || city.en)}`
			)
			const allRoutes = ['/', '/city', ...cityRoutes]
			return allRoutes
		},
	},
	pwa: {
		manifest: {
			name: 'Weather Check',
			short_name: 'Weather Check',
			description:
				"Track the weather in the selected city or cities, it's up to you.",
			background_color: '#161B30',
			theme_color: 'black',
			categories: ['weather'],
			display: 'standalone',
			start_url: '/',
			icons: [
				{
					src: '/pwa-icons/manifest-icon-512.png',
					sizes: '512x512',
					type: 'image/png',
				},
				{
					src: '/pwa-icons/manifest-icon-192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: '/pwa-icons/manifest-icon-144.png',
					sizes: '144x144',
					type: 'image/png',
				},
				{
					src: '/pwa-icons/manifest-icon-64.png',
					sizes: '64x64',
					type: 'image/png',
				},
			],
			screenshots: [
				{
					src: '/pwa-screenshots/desktop.png',
					sizes: '1200x800',
					type: 'image/png',
					form_factor: 'wide',
				},
				{
					src: '/pwa-screenshots/mobile.png',
					sizes: '320x640',
					type: 'image/png',
					form_factor: 'narrow',
				},
			],
		},
		workbox: {
			skipWaiting: true,
			clientsClaim: true,
			globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
			navigateFallback: null,
		},
		devOptions: { enabled: false, type: 'module' },
	},
})
